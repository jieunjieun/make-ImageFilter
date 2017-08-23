var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');

 // canvas에 image 크기 맞춰서 들어가게 하는 함수
function drawImageData(image) {
    image.height *= canvas.offsetWidth / image.width;
    image.width = canvas.offsetWidth;

    if(image.height > canvas.offsetHeight){
        image.width *= canvas.offsetHeight / image.height;
        image.height = canvas.offsetHeight;
    }


    ctx.drawImage(image, 0, 0, image.width, image.height);
    console.log(ctx.getImageData(0,0, canvas.width, canvas.height));
}

//canvas에 있는 image clear 하기
$('#clearButton').on('click', function(e){
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    // ctx.restore();
    var $file = $('#loadButton');
     $file.wrap('<form>').closest('form').get(0).reset();
     $file.unwrap();
});

// 사진 가져오는 버튼 눌렀을 때
$('#loadButton').on('change', function (e) {
    var file = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            drawImageData(image);
        }
    };

    fileReader.readAsDataURL(file);
});


//image가 투명한 필터버튼
$('#alphaButton').on('click', function(){
    var pixels = ctx.getImageData(0,0,canvas.width, canvas.height);
    var filteredImage = alphaFilter(pixels,100);
    ctx.putImageData(filteredImage,0,0);
})

//image가 초록초록한 필터버튼
$('#greenButton').on('click', function(){
    //이미지 정보 가져오기
    var pixels = ctx.getImageData(0,0,canvas.width, canvas.height);
    //필터 고르기
    var filteredImage = greenFilter(pixels);
    //필터 입히기
    ctx.putImageData(filteredImage,0,0)
});

//image가 pink한 필터버튼
$('#pinkButton').on('click', function(){
    //이미지 정보 가져오기 
    var pixels = ctx.getImageData(0,0,canvas.width, canvas.height);
    //필터고르기
    var filteredImage = loveFilter(pixels);
    //필터 입히기
    ctx.putImageData(filteredImage,0,0)
});

//image가 투명한색이 됨
function alphaFilter(pixels,value){
    var d = pixels.data;
    for(var i = 0; i<pixels.data.length; i+=4){
        d[i+3] = value; //alpha
    }
    return pixels;
}

//image 반전 필터
function invertFilter(pixels) {
    var d = pixels.data;
    for(var i=0; i<pixels.data.length; i+=4 ){
        d[i] = 255 - d[i];     // R
        d[i+1] = 255 - d[i+1]; // G
        d[i+2] = 255 - d[i+2]; // B
        d[i+3] = 255;          // Alpha
    }
    return pixels;
}


//image 밝게 해주는 필터
function brightnessFilter (pixels, value){
    var d = pixels.data; //픽셀 데이터 받아오기
    for(var i = 0; i<d.length; i+=4){
        d[i] += value/3;
        d[i+2] += value/3;
        d[i+3] += value/3;
    }
    return pixels;
}
//image 흑백 핉터
function grayscaleFilter(pixels){
    var d = pixels.data;
    for(var i = 0; i<d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        var v = 0.2126*r + 0.7152*g + 0.0722*b; //보정값
        d[i] = d[i+1] = d[i+2]  = v
    }
    return pixels;
}

// image 세피아 필터
function sepiaFilter(pixels) {
    var d = pixels.data;
    for(var i =0; i< d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        d[i] = r*0.3588 + g*0.7044 + b*0.1368;
        d[i+1] = r*0.2990 + g*0.5870 + b*0.1140;
        d[i+2] = r*0.2392 + g*0.4696 + b*0.0912;
    }
    return pixels;
}


//image가 핑크핑크한 filter
function loveFilter(pixels){
    var d = pixels.data;
    for(var i = 0; i< d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        d[i] = r*0.9 + g*0.05 + b*0.2; //R
        d[i+1] = r*0.0 + g*0.9215 + b*0.0; //G
        d[i+2] = r*0.0 + g*0.0 + b*0.9960; //B
    }
    return pixels;
}
//image가 초록초록한 필터
function greenFilter(pixels){
    var d = pixels.data;
    for(var i = 0; i<d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        d[i] = r*0.9568 + g*0.0 + b*0.0;  //R
        d[i+1] = r*0.0 + g*0.9803 + b*0.0; //G
        d[i+2] = r*0.0 + g*0.0 + b*0.8941; //B
    }
    return pixels;
}




 