jQuery(function () {
    var timeoutId = null;
    var data_cache = {};
    var grid_order_item = $("#grid_order_item");

    //向购物车添加产品
    //ids={[]}--产品编号
    //flag={retail | distrib}--零售或分销，会影响价格计算
    //isrm={yes|no}
    function add_cart_products($table, ids) {
        var flag = "";      //此标记非常重要，如果是retail添加的产品将以零售客户计价反之则分销商
        var isrm = "no";
        if (window.__JXFX_CONFIG__) {
            var config = window.__JXFX_CONFIG__;
            if (config.cart_flag)
                flag = config.cart_flag;
            if (config.cart_isrm)
                isrm = config.cart_isrm;
        }

        $.post("/services/tempsaveorder.aspx", { "op": "product", "ids": ids.join(','), "flag": flag, "isrm": isrm }, function (data_server) {
            if (data_server.Code <= 0) {
                helper.alert(data_server.Message);
                return false;
            }
            var items = data_server.Result;
            var tbody = $table.find("tbody")
            var html = [];
            for (var i = 0; i < items.length; i++) {
                html.push("<tr data-json='" + items[i].FProductId + "'>");
                html.push("<td>");
                html.push(items[i].FProductName);
                html.push("</td>");
                html.push("<td>");
                html.push(items[i].Credit);
                html.push("</td>");
                html.push("<td>");
                html.push(items[i].Price);
                html.push("</td>");
                html.push("<td style='text-align:center;'>");
                html.push("<input type='text' class='ui-widget-content' style='width:22px;'  value='" + items[i].Count + "'/>");
                html.push("<a data-command='increment'> + </a>");
                html.push("<a data-command='decrement'> - </a>");
                html.push("</td>");
                html.push("<td>");
                html.push(items[i].TotalCredits);
                html.push("</td>");
                html.push("<td>");
                html.push(items[i].TotalPrices);
                html.push("</td>");
                html.push("<td>");
                html.push(items[i].ExtNote1);
                html.push("</td>");
                html.push("<td>");
                html.push("     <a data-command='remove'>移除产品</a>");
                html.push("     <a data-command='remark'>备注</a>");
                html.push("     <a href='/details/pid-" + items[i].FProductId + ".aspx' target='_blank'>产品详情</a>");
                html.push("</td>");
                html.push("</tr>");
            }
            tbody.html(html.join(""));
        }, "json");
    }

    //更新产品数量
    function updata_count_product($row, data_json, op) {
        var count_input = $row.find("input[type='text']");
        var count = parseInt(count_input.val());
        if (op == "increment") {
            count++;
        } else if (op == "decrement") {
            count--;
            if (count <= 0)
                count = 1;
        } else {
            return false;
        }
        count_input.val(count);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            $.post("/services/tempsaveorder.aspx", { "op": "product_count", "pid": data_json, "count": count }, function (data_server) {
                if (data_server.Code < 0) {
                    if (data_server.Code != 0)
                        helper.alert(data_server.Message);
                    return false;
                }
                count_input.val(data_server.Result.Count);
                $row.find("td").get(4).innerHTML = data_server.Result.TotalCredits
                $row.find("td").get(5).innerHTML = data_server.Result.TotalPrices
            }, "json");
        }, 500);
    }
    //移出产品
    function update_remove_product($row, data_json) {
        $.post("/services/tempsaveorder.aspx", { "op": "product_remove", "pid": data_json }, function (data_server) {
            if (data_server.Code < 0) {
                if (data_server.Code != 0)
                    helper.alert(data_server.Message);
                return false;
            }
            $row.remove();
        }, "json");
    }
    //更新备注
    function updata_remark_product($row, data_json) {

        function remark_handler(pid, remark) {
            $.post("/services/tempsaveorder.aspx", { "op": "product_remark", "pid": pid, "remark": remark }, function (data_server) {
                if (data_server.Code < 0) {
                    if (data_server.Code != 0)
                        helper.alert(data_server.Message);
                    return false;
                }
                $row.find("td").get(6).innerHTML = data_server.Result.ExtNote1;
            }, "json");
        }

        $("#panel_remark").dialog({
            autoOpen: true
            , title: "添加备注"
            , buttons: {
                "确定": function () {
                    $this = $(this);
                    var remark = $this.find("textarea").val();
                    remark_handler(data_json, remark);
                    $this.dialog("close");
                }
            }
            , draggable: false
            , resizable: false
        }).find("textarea").val("");
    }



    grid_order_item.click(function (ev) {
        var target = $(ev.target);
        var command = target.attr("data-command");
        if (!command) {
            return;
        }
        var tr_item = target.parents("tr");
        var data_json = tr_item.attr("data-json");
        try { data_json = eval("(" + ext_attr + ")"); } catch (e) { }


        switch (command) {
            case "remove": update_remove_product(tr_item, data_json);
                break;
            case "increment": updata_count_product(tr_item, data_json, "increment");
                break;
            case "decrement": updata_count_product(tr_item, data_json, "decrement");
                break;
            case "remark": updata_remark_product(tr_item, data_json);
                break;
        }
    });


    //自动完成输入框
    var auto_product_name = $("#auto_product_name").autocomplete({
        source: function (request, response) {
            $.get("/services/products.aspx", { "op": "name", "value": request.term }, function (data_server) {
                var data_map = $.map(data_server.Result, function (item) {
                    return { label: item.Name, value: item.Name, ext_id: item.Id };
                })
                response(data_map);
            }, "json");
        },
        minLength: 1,
        select: function (event, ui) {
            data_cache["current_selected"] = ui.item;
        },
        open: function () { ; },
        close: function () { ; }
    }).keydown(function (ev) {
        if (ev.which == 13) {
            ev.preventDefault();
            ev.stopPropagation();
            var selected = data_cache["current_selected"];
            if (selected) {
                add_cart_products(grid_order_item, [selected.ext_id]);
                data_cache["current_selected"] = null;
                auto_product_name.val("");
            }
        }
    });

    $("#btn_enter").click(function (ev) {
        var selected = data_cache["current_selected"];
        if (selected) {
            add_cart_products(grid_order_item, [selected.ext_id]);
            data_cache["current_selected"] = null;
            auto_product_name.val("");
        }
    });


    var batch_products = $("#tree_products").batch_products();
    //批量添加对话框
    var panel_batch = $("#panel_batch").dialog({
        autoOpen: false
            , model: true
            , title: "批量添加产品"
            , buttons: {
                "确定": function () {
                    var ids = [];
                    batch_products.find("input:checked").each(function () {
                        ids.push(this.value);
                    });
                    add_cart_products(grid_order_item, ids);
                    $(this).dialog("close");
                }
            }
            , width: 350
            , height: 400
            , draggable: false
            , resizable: false
    });


    $("#btn_batch_enter").toggle(function (ev) {
        panel_batch.dialog("open");
    }, function (ev) {
        panel_batch.dialog("close");
    });
});