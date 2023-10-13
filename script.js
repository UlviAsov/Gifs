var addInput = document.getElementById('addInput');
if(localStorage.getItem('gifName')){
    var arr = JSON.parse(localStorage.getItem('gifName'))
    for(let i=0;i<arr.length;i++){
        var tag = document.createElement('span');
        tag.setAttribute('class','tag')
        tag.innerText = arr[i];
        $('#tags').append(tag);
    }
}
else{
    var arr = [];
}

$('#addBtn').on('click',()=>{
    var addInputValue = addInput.value;
    arr.push(addInputValue)
    localStorage.setItem('gifName',JSON.stringify(arr));
    var tag = document.createElement('span');
    tag.setAttribute('class','tag')
    tag.innerText = addInputValue;
    $('#tags').append(tag);
    addInput.value = "";
    var counter = 0;
    tag.onclick = () =>{
        $('#gifs').text("")
        var text = tag.innerText
        $.ajax(`https://api.giphy.com/v1/gifs/search?api_key=UBmXfTwmhxbyWHXhKfdqwt3bkYTpKX9F&q=${text}&limit=25&offset=${counter}&rating=g&lang=en&bundle=messaging_non_clips`).then((res)=>{
            for(i=0;i<res.data.length;i++){
                var gif = document.createElement("img")
                gif.setAttribute('src',res.data[i].images.fixed_width_small.url)
                $('#gifs').append(gif)
            }
        })  
        counter +=25;
    }
});

window.onkeydown = (e)=>{
    if(e.which == "13"){
        var addInputValue = addInput.value;
        arr.push(addInputValue)
        localStorage.setItem('gifName',JSON.stringify(arr));
        var tag = document.createElement('span');
        tag.setAttribute('class','tag')
        tag.innerText = addInputValue;
        $('#tags').append(tag);
        addInput.value = "";
        var counter = 0;
        tag.onclick = () =>{
            $('#gifs').text("")
            var text = tag.innerText
            $.ajax(`https://api.giphy.com/v1/gifs/search?api_key=UBmXfTwmhxbyWHXhKfdqwt3bkYTpKX9F&q=${text}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`).then((res)=>{
                for(i=0;i<res.data.length;i++){
                    var gif = document.createElement("img")
                    gif.setAttribute('src',res.data[i].images.fixed_width_small.url)
                    $('#gifs').append(gif)
                }
            })  
            counter +=25;
        }
    }
}
