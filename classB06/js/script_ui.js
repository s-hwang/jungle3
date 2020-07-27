$(function(){
    //첫화면세팅
    $(".btn_setting").click(function(){
        $(this).parent().slideUp();
        loadDataFn();
    });
    


   var complateData;//json데이터 담는 변수(전역변수)
    function loadDataFn(){//json파일을 받아오는 함수
        
        $.ajax({
            url:"js/data.json",//예시http://abcd.com/process/data.jsp 이런식으로 개발자가 프로그램경로 알려줌
            dataType:"json",
            success: function(result){
                //console.log(result);
                complateData = result.seatInfo;
                settingSeatFn();
            }
        })
    }
    function settingSeatFn(){
        $(".section.reservation").slideDown();
        //파싱작업
        for(var i=0; i<complateData.length; i++){
            var name = complateData[i].name;
            var price = complateData[i].price;
            var reserve = complateData[i].reserve;
            $(".section.reservation > ol").append('<li class="unit"><button data-price="'+price+'" '+reserve+'>'+name+'</button></li>')
        }

        var selectArray = []; //선택좌석 index를 담는 배열

        var name;
        var price;
        //좌석 버튼 클릭이벤트
        $(".section.reservation .unit > button").click(function(){
            //alert($(this).text());

            $(this).toggleClass("select");
            if($(this).hasClass("select")){ //좌석 선택할경우
                selectArray.push($(this).parent().index());//push는 배열의 값을 추가
                
            }else{ //좌석 해제될 경우
                var removeIndex = selectArray.indexOf($(this).parent().index()); //배열에 담겨있는 순서(index)의 값을 찾음
                selectArray.splice(removeIndex, 1)//배열의 index위치부터 1자리를 삭제함 / splice는 해당 index를 삭제
                
            }
            name = ""; //값초기화
            price = 0; //값초기화
            for(var i=0; i<selectArray.length; i++){
              name += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").text()+" ";
              price += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").data("price");
              
            }
            $(".txt_info_number").text(name);
            $(".txt_info_total").text(price);
        });
        //완료 이벤트
        $(".btn_submit").click(function(){
            $(".section.reservation").slideUp();
            $(".section.complete").slideDown();
            $(".section.complete .txt_number").text(name);
            $(".section.complete .txt_price > strong").text(price);
        })
    };
})