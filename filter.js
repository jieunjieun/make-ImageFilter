var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
 // canvas 랑 image 사이즈 맞춰줌
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

$('#filterButton').on('click', function () {
    // 이미지정보 가져오기
    var pixels = ctx.getImageData(0,0, canvas.width, canvas.height);
    //필터 입히기 
    var filteredData = invertFilter(pixels);
    // canvas에 필터 넣기
    ctx.putImageData(filteredData, 0 , 0);
});

// 반전 필터
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

//밝게 해주는 필터
function brightnessFilter (pixels, value){
    var d = pixels.data; //픽셀 데이터 받아오기
    for(var i = 0; i<d.length; i+=4){
        d[i] += value/3;
        d[i+2] += value/3;
        d[i+3] += value/3;
    }
    return pixels;
}
//흑백 핉터
function grayscaleFilter(pixels){
    var d = pixels.data;
    for(var i = 0; i<d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        var v = 0.2126*r + 0.7152*g + 0.0722*b; //보정값
        d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
}
