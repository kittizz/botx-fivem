var isRun = false
var ms = 250

function renderx() {
    $(".header").text("Botx - ระบบทำงานไว")

    $("#ShopResult").css("overflow-y", "unset")
    $("#ShopResult").html(`

<div class="card">
    <div class="card-body">
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <form class="pb-5">
                        <h1 style="color: red">
                            สถานะ : <span id="status"></span>
                        </h1>
                        <h2 style="color: gold">
                            ความไวตอนนี้ :
                            <span id="speed"></span> มิลลิวินาที
                        </h2>

                        <div class="form-group">
                            <label for="inputms">ความไว</label>
                            <input
                                type="number"
                                class="form-control"
                                id="inputms"
                                placeholder="ใส่ความไว 1000 = 1 วิ"
                            />
                        </div>

                        <button
                            type="button"
                            class="btn"
                            style="background-color: dodgerblue"
                            onclick="updatex()"
                        >
                            อัพเดทตั้งค่า
                        </button>
                        <button
                            type="button"
                            class="btn"
                            style="background-color: green"
                            onclick="onx()"
                        >
                            เปิด
                        </button>
                        <button
                            type="button"
                            class="btn"
                            style="background-color: red"
                            onclick="offx()"
                        >
                            ปิด
                        </button>
                        <div class="form-group" id="dev">
                            <br />
                            <label for="code"
                                >JS Code</label
                            >
                            <textarea
                                class="form-control"
                                id="code"
                                rows="3"
                                style="margin: 0px; height: 262px; width: 736px"
                            ></textarea>
                            <button
                                type="button"
                                class="btn"
                                style="background-color: red"
                                onclick="unloadx()"
                            >
                                ถอดการติดตั้ง (unload)
                            </button>
                            <button
                                type="button"
                                class="btn"
                                style="background-color: green"
                                onclick="loadx()"
                            >
                                Run Code
                            </button>
                            <button
                                type="button"
                                class="btn"
                                style="background-color: blue"
                                onclick="closex()"
                            >
                                Close Dev
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

`)

    if (isRun) {
        $("#status").text("กำลังทำงาน")
        $("#status").css("color", "green")
    } else {
        $("#status").text("หยุดทำงาน")
        $("#status").css("color", "red")
    }
    $("#speed").text(ms)
    $("#dev").hide()
}
function updatex() {
    if ($("#inputms").val() == "") {
        return
    }
    ms = parseInt($("#inputms").val())
    renderx()
}
function onx() {
    isRun = true
    botx()
    renderx()
}
function offx() {
    isRun = false
    renderx()
}

function unloadx() {
    removeAllListeners(window, "message")
    removeAllListeners(document, "keypress")

    $(".header").text("Economy - ราคาตลาดกลาง")
    $("#ShopResult").css("overflow-y", "auto")
}
function loadx() {
    eval($("#code").val())
}
function closex() {
    $("#dev").hide()
}

function uix(event) {
    if (event.data.action == "display") {
        renderx()
    }
}
async function botx() {
    console.log("Do!!!")
    try {
        await fetch("http://mythic_progbar/actionFinish", {
            headers: {
                accept: "*/*",
                "content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            },
            referrer: "",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: "{}",
            method: "POST",
            mode: "cors",
            credentials: "omit",
        })
    } catch (error) {
        true
    } finally {
        if (isRun) {
            setTimeout(botx, ms)
        } else {
            console.log("STOP!!!")
        }
    }
}

function logKey(e) {
    if (e.code == "KeyD") {
        $("#dev").show()
    }
    if (e.code == "End") {
        unloadx()
    }
}

if (typeof window._eventHandlers != "object") {
    window._eventHandlers = {}
}

var addListener = (node, event, handler, capture = false) => {
    if (!(event in window._eventHandlers)) {
        window._eventHandlers[event] = []
    }
    // here we track the events and their nodes (note that we cannot
    // use node as Object keys, as they'd get coerced into a string
    window._eventHandlers[event].push({
        node: node,
        handler: handler,
        capture: capture,
    })
    node.addEventListener(event, handler, capture)
}

var removeAllListeners = (targetNode, event) => {
    // remove listeners from the matching nodes
    window._eventHandlers[event]
        .filter(({ node }) => node === targetNode)
        .forEach(({ node, handler, capture }) =>
            node.removeEventListener(event, handler, capture)
        )

    // update window._eventHandlers global
    window._eventHandlers[event] = window._eventHandlers[event].filter(
        ({ node }) => node !== targetNode
    )
}
addListener(window, "message", uix, false)
addListener(document, "keypress", logKey, false)
