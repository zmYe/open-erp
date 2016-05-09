/**
 * 报价
 * Created by zhangjh on 2015/9/18.
 */

(function ($) {
    "use strict";
    var infoURL = path + "/development/quotepre/info/";
    var editURL = path + "/development/quotepre/edit/";
    var listURL = path + "/development/quotepre/list/";
    var submitURL = path + "/development/quotepre/submit/";

    /**
     * 初始化报价信息
     * @param _data
     */
    function iniBomQuotedInfo(_data) {
        var natrualkey = $("#natrualkey").val();
        if (_data != null && natrualkey != '' && natrualkey != 'null') {
            Object.keys(_data).map(function (key) {
                $('#offerDescDetail input').filter(function () {
                    return key == this.name;
                }).val(_data[key]);
                // if (key == 'spId') {
                //     $('#spId').val(_data[key])
                // }
                // else if (key == 'fabricId') {
                //     $('#fabricId').val(_data[key])
                // }
                //$("#" + key).val(_data[key]);
            });
        }
    }


    /**
     * 报价信息
     */
    function buildBomQuoted() {
        var quotedInfo = {};
        quotedInfo.factoryOffer = $("#factoryOffer").val();
        quotedInfo.factoryMargins = $("#factoryMargins").val();
        quotedInfo.costing = $("#costing").val();
        quotedInfo.lpPrice = $("#lpPrice").val();
        quotedInfo.euroPrice = $("#euroPrice").val();
        quotedInfo.exchangeCosts = $("#exchangeCosts").val();
        quotedInfo.bomId = $("#natrualkey").val();
        quotedInfo.spId = $("#spId").val();
        quotedInfo.fabricId = $("#fabricId").val();
        quotedInfo.natrualkey = $("#natrualkey").val();
        return quotedInfo;
    }


    $(function () {
        // var natrualKey = $("#natrualkey").val();
        // $.sendRestFulAjax(infoURL + natrualKey, null, 'GET', 'json', _doSuccess_info);
        $("#quotepreForm").on('click', '#saveBtn', tosave);
        $("#quotepreForm").on('click', '#submitBtn', tosubmit);
        //监听价格变动
        $("#quotepreForm").on("click", "input", cbOfferDescDetail);
        var $btnDIV = $("#btnInfo");
        $.showHandleBtn($btnDIV, $("#approveStatus").val(), tosave, $("#natrualkey").val(), $("#taskId").val(), $("#stateCode").val(), $("#processInstanceId").val());
    });


    function cbOfferDescDetail() {
        //工厂利润率改变，重新计算欧元报价
        var _$id = $(this).attr('id');
        if (_$id == 'euroPrice') {
            cacuEuroPrice();
        }
        // else if (_$id === 'costing') {//成本核算
        //     $.caculateCostingVal();
        // }

    }

    // /**
    //  * 成本核算
    //  */
    // function caculateCostingVal() {
    //     //不用计算成本
    //
    //     var costingVal = 0;
    //     $("input[name='colorPrice']").each(
    //         function () {
    //             var _$thisVal = $(this).val();
    //             //是否是有效值
    //             if ($.strIsEmpty(_$thisVal)) {
    //                 _$thisVal = 0;
    //             }
    //             costingVal = $.floatAdd(costingVal, parseFloat(_$thisVal));
    //         }
    //     )
    //     $("#costing").val(costingVal);
    // }


    /**
     * 计算欧元价格
     * @returns {*}
     */
    function cacuEuroPrice() {
        var exchangeCosts = $("#exchangeCosts").val();
        var factoryOffer = $("#factoryOffer").val();
        //var euroPrice = factoryOffer * (1 + Number(factoryMargins));
        if ($.strIsEmpty(exchangeCosts)) {
            bootbox.alert("请输入换汇成本");
        }
        else if ($.strIsEmpty(factoryOffer)) {
            bootbox.alert("请输入工厂报价");
        }
        else {
            var euroPrice = $.floatDiv(factoryOffer, exchangeCosts);
            $("#euroPrice").val(euroPrice.toFixed(2));
        }
    }


    // function _doSuccess_info(_data) {
    //     iniBomQuotedInfo(_data);
    //     var $btnDIV = $("#btnInfo");
    //     $.showHandleBtn($btnDIV, _data["approveStatus"], tosave, $("#natrualkey").val(), $("#taskId").val(), $("#stateCode").val(), $("#processInstanceId").val());
    // }

    function tosave() {
        var info = buildBomQuoted();//$("#quotepreForm").serialize();
        $.sendJsonAjax(editURL, info, function () {
            window.location.href = listURL;
        })
    }

    function tosubmit() {
        var nk = $("#natrualkey").val();
        var taksId = "null";
        $.sendJsonAjax(submitURL + taksId + "/" + nk, {}, function () {
            window.location.href = listURL;
        })
    }

}(jQuery));
