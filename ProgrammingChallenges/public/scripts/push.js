$("button").click(function(){
    $.redirect("/sendCode",
    {
        code:editor.getValue()
        // ,
        // lang:$("selector:selected").text()
    },
    "POST")
})