window.addEventListener("message", function (event) {
    count_item = 0
    if (event.data.action == "display") {
        $(".ui").fadeIn("fast")
    } else if (event.data.action == "setItems") {
        LoadShop(
            JSON.parse(
                '[{"price":1242,"label":"ไข่มุก","item":"peal"},{"price":1000,"label":"เหรียญ bitcoin","item":"bitcoin"},{"price":654,"label":"แร่เพชร","item":"stone_diamond"},{"price":495,"label":"แร่ทอง","item":"stone_gold"},{"price":418,"label":"อุปกรณ์ทางการแพทย์","item":"medikitsell"},{"price":400,"label":"เหรียญ ETH","item":"ethcoin"},{"price":200,"label":"เหรียญ bitkub","item":"kubcoin"},{"price":119,"label":"เนื้อเสือดำ","item":"a_c_panther"},{"price":105,"label":"ไม้สำเร็จรูป","item":"woodc"},{"price":105,"label":"ผ้าไหม","item":"clothc"},{"price":100,"label":"ไก่แพ๊ค","item":"chickenc"},{"price":90,"label":"นมวัวกล่อง","item":"milk_pack"},{"price":82,"label":"เนื้อกวาง","item":"a_c_deer"},{"price":75,"label":"เนื้อหมูดำ","item":"a_c_boar"},{"price":70,"label":"หินเจียระไน","item":"stone_process"},{"price":68,"label":"หอยเชลแพ็ก","item":"shell_pack"},{"price":65,"label":"เห็ดแพ๊ค","item":"mushroom_pack"},{"price":58,"label":"ปลาสลิด","item":"minifish"},{"price":20,"label":"เหรียญผู้สยบยักษ์","item":"giantcoin"}]'
            )
        )
    } else {
        $(".ui").fadeOut("fast")
    }
})
$(document).ready(() => {
    $(".ui").fadeIn("fast")
    LoadShop(
        JSON.parse(
            '[{"price":1242,"label":"ไข่มุก","item":"peal"},{"price":1000,"label":"เหรียญ bitcoin","item":"bitcoin"},{"price":654,"label":"แร่เพชร","item":"stone_diamond"},{"price":495,"label":"แร่ทอง","item":"stone_gold"},{"price":418,"label":"อุปกรณ์ทางการแพทย์","item":"medikitsell"},{"price":400,"label":"เหรียญ ETH","item":"ethcoin"},{"price":200,"label":"เหรียญ bitkub","item":"kubcoin"},{"price":119,"label":"เนื้อเสือดำ","item":"a_c_panther"},{"price":105,"label":"ไม้สำเร็จรูป","item":"woodc"},{"price":105,"label":"ผ้าไหม","item":"clothc"},{"price":100,"label":"ไก่แพ๊ค","item":"chickenc"},{"price":90,"label":"นมวัวกล่อง","item":"milk_pack"},{"price":82,"label":"เนื้อกวาง","item":"a_c_deer"},{"price":75,"label":"เนื้อหมูดำ","item":"a_c_boar"},{"price":70,"label":"หินเจียระไน","item":"stone_process"},{"price":68,"label":"หอยเชลแพ็ก","item":"shell_pack"},{"price":65,"label":"เห็ดแพ๊ค","item":"mushroom_pack"},{"price":58,"label":"ปลาสลิด","item":"minifish"},{"price":20,"label":"เหรียญผู้สยบยักษ์","item":"giantcoin"}]'
        )
    )
})
var Config = new Object()
Config.closeKeys = [113, 27, 90]

function LoadShop(items) {
    $("#ShopResult").html("")
    $.each(items, function (index, item) {
        var html_items =
            '<div id="item-' +
            index +
            '" class="col slot-1" style="padding: 0px;width:20%;" data-index="' +
            index +
            '">' +
            '<div class="card slot z-depth-0">' +
            '<div class="card-image" align="center" style="padding: 15px 0 15px 0;">' +
            '<img src="https://bitkubcoin.com/wp-content/uploads/2021/05/Bitkub-Coin.png" style="width: 100px;height: 100px;">' +
            "</div>" +
            '<div class="card-content" align="center" style="padding: 0;">' +
            item.label +
            "</div>" +
            '<div class="card-content" align="center" style="padding: 5px 0 5px 0;">' +
            '<a data-action="remove" data-index="' +
            index +
            '" class="btn-floating btn-flat waves-effect waves-red" data-price="' +
            item.price +
            '" style="opacity: 0.8;margin-right: 20px;"><i class="material-icons">remove</i></a>' +
            '<span id="item-count-' +
            index +
            '">1</span>' +
            '<input id="text-item-count-' +
            index +
            '" type="hidden" value="1" />' +
            '<a data-action="add" data-index="' +
            index +
            '" data-limit="' +
            item.weight +
            '" data-price="' +
            item.price +
            '" class="btn-floating btn-flat waves-effect waves-green" style="opacity: 0.8;margin-left: 20px;"><i class="material-icons">add</i></a>' +
            "</div>" +
            '<div class="card-content" align="center" style="padding: 5px 0 15px 0;">' +
            'ราคาขาย : <span id="item-price-' +
            index +
            '">' +
            item.price +
            "</span> $ ต่อชิ้น" +
            "</div>" +
            '<div class="card-content" align="center" style="padding: 0px 0 10px 0;">' +
            '<button type="button" data-action="buy" data-index="' +
            index +
            '" data-item="' +
            item.item +
            '" class="btn-floating btn-large btn-flat waves-effect waves-light" style="opacity: 0.9"><i class="material-icons">calculate</i></button>' +
            "</div>" +
            "</div>" +
            "</div>"
        $("#ShopResult").append(html_items)
        $("#item-" + index).data("item", item)
        $("#item-" + index).data("inventory", "main")
    })
}

$(document).ready(function () {
    //ออกจากร้าน
    $("body").on("keyup", function (key) {
        if (Config.closeKeys.includes(key.which)) {
            closeHUD()
        }
    })

    //ลด
    $("body").on("click", '[data-action="remove"]', function () {
        var index = $(this).attr("data-index")
        var price = $(this).attr("data-price")
        var object = $("#text-item-count-" + index)
        var count_item = parseInt(object.val())
        if (count_item <= 1) {
            object.val(1)
            $("#item-count-" + index).text("1")
        } else {
            object.val(count_item - 1)
            $("#item-count-" + index).text(count_item - 1)
        }

        $("#item-price-" + index).text(price * parseInt(object.val()))
    })

    //เพิ่ม
    $("body").on("click", '[data-action="add"]', function () {
        var index = $(this).attr("data-index")
        var limit = $(this).attr("data-limit")
        var price = $(this).attr("data-price")
        var object = $("#text-item-count-" + index)
        var count_item = parseInt(object.val())

        if (count_item >= limit) {
            object.val(limit)
            $("#item-count").text(limit)
        } else {
            object.val(count_item + 1)
            $("#item-count-" + index).text(count_item + 1)
        }

        $("#item-price-" + index).text(price * parseInt(object.val()))
    })

    //ซื้อ
    $("body").on("click", '[data-action="buy"]', function () {
        var $btn = $(this)
        var index = $(this).attr("data-index")
        var item = $(this).attr("data-item")
        var object = $("#text-item-count-" + index)
        var count_item = parseInt(object.val())

        $btn.attr("disabled", true)

        $.post(
            "http://Xenon_Economy/NUIFocusOff",
            JSON.stringify({
                itemName: item,
                amount: count_item,
                index: parseInt(index),
            })
        )

        setTimeout(function () {
            $btn.attr("disabled", false)
        }, 2000)
    })
})

function closeHUD() {
    $.post("http://Xenon_Economy/NUIFocusOff", JSON.stringify({}))
}
