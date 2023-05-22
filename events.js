function performConfirmEvents(randomEventNum)
{
	switch (randomEventNum)//根据时间编号产生事件效果
	{
		case 1:
			popSub(5);
			break;
		case 2:
			production['product1Num']+=5;
			elementPro['product1Num'].innerText=production['product1Num'];
			break;
		default:
			break;
	}
}
function randomEvents()
{
	var prSum=0,coefficient,randomEventNum;//randomEventNum是随机事件编号
	var randomEventsLength=Object.keys(randomEventsPr).length;//获取字典的大小
	//prPrefixSum
	prPrefixSum=new Array(randomEventsLength+1);
	prPrefixSum[0]=0;
	var i=1;
	for(var key in randomEventsPr)//和人口增加的思路类似，但概率是预设的
	{
		prSum+=randomEventsPr[key]*(1+0.01*eventsBuff[key]);//原始概率+buff
		prPrefixSum[i]=Number(prPrefixSum[i-1]+randomEventsPr[key]*(1+0.01*eventsBuff[key]));
		i++;
	}
	coefficient=1/prSum;
	coefficient=coefficient.toFixed(7);
	coefficient=Number(coefficient);
	for(var i=1;i<=randomEventsLength;i++)
	{
		prPrefixSum[i]*=coefficient;
		prPrefixSum[i]=prPrefixSum[i].toFixed(7);
		prPrefixSum[i]=Number(prPrefixSum[i]);
	}
	randomPr=Math.random();//随机生成0~1之间的数
	for(var i=1;i<=randomEventsLength;i++)
	{
		if(prPrefixSum[i]>=randomPr)
			{randomEventNum=i;break;}
	}
	return randomEventNum;
}
function addEventsBuff(num)
{
	if(!document.getElementById('buff'+num))
	{
		eventsBuff[eventsBuffsEffect['buff'+num]['eventNum']]+=eventsBuffsEffect['buff'+num]['effect'];
		var buffDiv=document.createElement('div');//创建新buff 元素
		buffDiv.setAttribute('id','buff'+num);
		buffDiv.innerHTML=buffsContent['buff'+num];
		document.getElementById("buffs").insertBefore(buffDiv,document.getElementById("buffLast"));/*insertbefore的. 前需要是buff
		last的上一级，假如bufflast被嵌套了*/
	}
}
function eventsDisplay()
{
	if(document.getElementById('eventsPopup') == null)
	{
		var randomEventsNum=randomEvents();//产生时间编号
		if(randomEventsAttribute['event'+randomEventsNum]['type']==1)
		{
			performConfirmEvents(randomEventsNum);//confirm事件 的效果
			var popup = document.createElement('div');
    		popup.setAttribute('id', 'eventsPopup'); // 添加id
    		popup.style.position = 'fixed';
    		popup.style.top = '50%';
    		popup.style.left = '50%';
    		popup.style.transform = 'translate(-50%, -50%)';
    		popup.style.backgroundColor = 'white';
			popup.style.padding = '200px';
			popup.style.border = '1px solid black';
			popup.style.zIndex = '9999';
			// create a new div element for the text
			var titleDiv = document.createElement('div');//标题
			titleDiv.innerText = randomEventsAttribute['event'+randomEventsNum]['title'];
			titleDiv.style.position = 'absolute';
			titleDiv.style.top = '10px';
			//titleDiv.style.left = '50px';
			titleDiv.style.fontSize = '22px';//字体大小
			titleDiv.style.left = '0';
			titleDiv.style.right = '0';
			titleDiv.style.textAlign = 'center';
			//titleDiv.style.wordWrap = 'break-word';//自动换行
			//titleDiv.style.maxWidth = 'calc(100% - 90px)';//难不成你个标题还换行？
			popup.appendChild(titleDiv);//将此文本加入到popup中
			//------------------------------------分割线----------------------------------------
			var contentDiv = document.createElement('div');//内容
			contentDiv.innerText = randomEventsAttribute['event'+randomEventsNum]['content'];
			contentDiv.style.position = 'absolute';
			contentDiv.style.top = '70px';
			contentDiv.style.left = '50px';
			contentDiv.style.fontSize = '17px';//字体大小
			contentDiv.style.wordWrap = 'break-word';//自动换行
			contentDiv.style.maxWidth = 'calc(100% - 100px)';//距离右边界n px时换行,n=-50时达到右边界，
			popup.appendChild(contentDiv);//将此文本加入到popup中
			//------------------------------------分割线----------------------------------------
			var confirmButton = document.createElement('button');
			confirmButton.style.position = 'absolute';
			confirmButton.style.bottom = '20px';
			confirmButton.style.right = '20px';
			confirmButton.style.background = 'none'; // 删除按钮背景
			//confirmButton.style.border = 'none';// 删除按钮边框
			confirmButton.style.fontSize = '1.5em';
			confirmButton.innerText = "confirm";
			//confirmButton.classList.add('cross'); // 创建关闭按钮内文本的class为cross
			confirmButton.addEventListener('click', function() {
				popup.remove(); // 点击关闭按钮时移除popup
			});
			popup.appendChild(confirmButton);
			// 将popup添加到body中
			document.body.appendChild(popup);
		}
		else
		{
			alert("waits");
		}
	}
}
//setInterval(eventsDisplay,eventSpeed);