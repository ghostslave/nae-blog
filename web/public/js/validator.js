Validator = {
    IsRequire: function (value) { return /^.+$/.test(value); },
    IsPicture: function (value) { return /(\.gif)|(\.jpg)|(\.jpeg)|(\.png)|(\.bmp)$/i.test(value); },
    IsEmail: function (value) { return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value); },
    IsInt: function (value) { return /^-?\d+$/.test(value); },
    IsUInt: function (value) { return /^\d+$/.test(value); },
    IsFloat: function (value) { return /^(?:-?\d+)(?:\.\d+)?$/.test(value); },
    IsUFloat: function (value) { return /^\d+(?:\.\d+)?$/.test(value); },

    IsSafeString: function (value) { return /^[_a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value); },
    IsPhone: function (value) { return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value); },
    IsMobile: function (value) { return /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(value); },
    IsUrl: function (value) { return /^(http|https):\/\/(\w+\.)*(\w+\.\w+)(.*)$/.test(value); },
    IsCurrency: function (value) { return /^^\d{1,8}(\.\d{1,2})?$/.test(value); },
    IsNumber: function (value) { return /^\d+$/.test(value); },
    IsUsername: function (value) { return /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,}$/i.test(value); },
    IsPassword: function (value) { return /^[a-z0-9_\u4e00-\u9fa5]{6,}$/i.test(value) && /^[^\?\s=]*$/.test(value); },
    IsDate: function (value) { return /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/.test(value); },

    IsEqual: function (value, value1) { if (value == "") return false; return (value == value1); },
    IsUnsafeSQL: function (value) { return /[-|;|,|\(|\)|\[|\]|\}|\{|%|@|\*|!|\']/.test(value); },
    IsSafeSQL: function (value) { return !this.IsUnsafeSQL(value); },


    GetStrength: function (sPW) {
        if (sPW.length < 6) return 0;         //密码太短  
        var res = 0;
        var modes = 0;
        var iN = null;
        for (var i = 0; i < sPW.length; i++) {
            var mode = 8;
            iN = sPW.charCodeAt(i);
            if (iN >= 48 && iN <= 57) mode = 1;         //数字  
            else if (iN >= 65 && iN <= 90) mode = 2;    //大写字母  
            else if (iN >= 97 && iN <= 122) mode = 4;   //小写  
            modes = modes | mode;
        }
        for (var i = 0; i < 4; i++) {
            if (modes & 1) res++;
            modes = modes >>> 1;
        }
        return res;
    }
}



