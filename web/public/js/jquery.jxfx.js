(function ($) {
    $.extend($.fn, {
        batch_products: function (settings) {
            var $this = this;
            var classes = { icon: "icon", title: "title" };
            var parames = {
                toggle: function (item, item_child, status, ev) {
                    if (status !== "open")
                        return;
                    if (item.data("isload"))  //如果数据己经加载
                        return;

                    var data_tid = item.attr("data-tid");
                    if (data_tid && Validator.IsUInt(data_tid)) {
                        if (item.data("begging"))   //如果数据正在加载
                            return;
                        var loader = $("<div class='loader'></div>").insertBefore(item_child);
                        item.data("begging", true);
                        $.get("/services/products.aspx", { "op": "typeid", value: data_tid }, function (data_server) {
                            item.data("beggin", false);
                            loader.remove();
                            if (data_server.Code > 0) {
                                item.data("isload", true);
                                if (data_server.Result.length > 0) {
                                    $.each(data_server.Result, function (k, n) {
                                        add_product(item_child, n);
                                    });
                                    return;
                                }
                                if (item_child.find("li").size() <= 0) {
                                    $("<li>无产品</li>").appendTo(item_child);
                                }
                            }
                        }, "json");
                    }
                }
            }

            function add_product(container, entry) {
                var sb = [];
                sb.push("<li>");
                sb.push("<input type='checkbox' value='" + entry.Id + "'>");
                sb.push("<span>" + entry.Name + "</span>");
                sb.push("</li>");
                $(sb.join("")).appendTo(container).click(function (ev) {
                    ev.stopPropagation();
                    var chekbox = $(this).find("input").click(function (ev) {
                        ev.stopPropagation();
                    })[0];
                    if (chekbox.checked)
                        chekbox.checked = false;
                    else
                        chekbox.checked = true;
                });
            }

            function init(setting) {
                $this.find("li").each(function () {
                    var item = $(this);
                    var item_child = item.children("ul");

                    if (item_child.size() > 0) {
                        item.prepend("<b class='" + classes.icon + "'>[展开]<b>");
                        item_child.hide();

                        item.toggle(function (ev) {
                            item_child.show();
                            item.find("." + classes.icon).text("[收缩]");
                            setting.toggle(item, item_child, "open", ev);
                        }
                        , function (ev) {
                            item_child.hide();
                            item.find("." + classes.icon).text("[展开]")
                            setting.toggle(item, item_child, "close", ev);
                        })
                    }
                })
            }
            init(parames);
            return $this;
        }
    });
})(jQuery)