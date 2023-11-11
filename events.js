function performEvent(eventName,btnName)//spResident稍后再做
{
	if(btnName!=null)
		document.getElementById(eventName).remove();
	var result= btnName==null ? eventResult[eventName] : eventResult[eventName][btnName];//event对应的result字典
	for(var key in eventResult[eventName].product)
		production[key]=Math.max(production[key]+result.product[key],0);
	for(var key in production)//刷新production显示
	{
		if(elementPro[key]=='xzx') continue;
		elementPro[key].innerText=parseInt(production[key]);
	}
	for(var key in result.buff)
	{
		if(result.buff[key]==-1)
			removeBuff(key);
		else if(result.buff[key]==0)
			buffDisable(key);
		else if(result.buff[key]==1)
		{
			if(buffAttribute[key].condition==0)
				addBuff(key);
			else if(buffAttribute[key].condition==1)
				buffAble(key);
		}
	}
	if(result.population>0)	
	{
		var tempVariation=Math.min(popLimit-population,result.population);
		population+=tempVariation;
		production.jobless+=tempVariation;
		document.getElementById('popNum').innerText=population;
		document.getElementById('jobless').innerText=production.jobless;
	}
	else if(result.population<0)
		popSub(-result.population);
	switch (eventName)
	{
		case 'event3':
			switch (btnName)
			{
				case 'btn1':
					console.log('btn1');
					break;
				case 'btn2':
					console.log('btn2');
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
	productionVariation();
	proVariationMonitor();
}
function performTradeEvents(eventName,ware,num)//大胆一点，买buff/事件
{
	var tempFlag=true;
	for(var key in tradeEventWare[eventName][ware].cost)//判断资源是否足够
	{
		if(production[key]>=tradeEventWare[eventName][ware].cost[key]*num)
			continue
		else
			{tempFlag=false;break;}
	}
	if(tempFlag)
	{
		for(var key in tradeEventWare[eventName][ware].cost)
			production[key]-=tradeEventWare[eventName][ware].cost[key]*num;//扣资源
		if(tradeEventWare[eventName][ware].content.type==1)//商品为product
			production[tradeEventWare[eventName][ware].content.productName]+=num*tradeEventWare[eventName][ware].content.num;
		for(var key in production)//刷新production显示
		{
			if(elementPro[key]=='xzx') continue;
			elementPro[key].innerText=parseInt(production[key]);
		}
	}
	productionVariation();
	proVariationMonitor();
}
function newEventAble()
{
	//preEvent检测阶段
	for(var key in eventsAttribute)
	{
		if(eventsAttribute[key]['available']==0)
		{
			var tempFlag=true;
			for(var i=0;i<eventsAttribute[key]['preEvent'].length;i++)
			{
				if(eventsAttribute[eventsAttribute[key]['preEvent'][i]]['displayed']==0)
				{tempFlag=false;break;}
			}
			if(tempFlag)
			{
				eventsAttribute[key]['available']=1;
				randomEventList[eventsAttribute[key]['cType']].push(key);
			}
		}
	}
}
function hideEvent(eventName)
{
	document.getElementById(eventName).style.display='none';
	if(document.getElementById('hideEventContainer')==null)
	{
		var hideEventContainer=document.createElement('div');//隐藏事件容器
		hideEventContainer.id='hideEventContainer';
		hideEventContainer.innerText='隐藏的事件:';
		hideEventContainer.style.position='absolute';
		document.getElementById('right').appendChild(hideEventContainer);

		var hideEventButton=document.createElement('div');//隐藏的事件
		hideEventButton.innerText=eventName;
		hideEventButton.style.width='fit-content';//与innerText相适应
		hideEventButton.style.marginBottom='5px';
		hideEventButton.style.border='1px solid black';
		hideEventButton.style.backgroundColor='white';
		hideEventButton.style.padding='1px 4px';
		hideEventButton.onclick=function(){
			if(document.getElementById('hideEventContainer').childElementCount==1)//若最后一个 删除容器
			{
				document.getElementById(eventName).style.display='';
				document.getElementById('hideEventContainer').remove();
			}
			else if(document.getElementById('hideEventContainer').childElementCount>1)//仅删除自己
			{
				document.getElementById(eventName).style.display='';
				hideEventButton.remove();
			}
		}
		hideEventContainer.appendChild(hideEventButton);
	}
	else
	{
		var hideEventButton=document.createElement('div');//隐藏的事件
		hideEventButton.innerText=eventName;
		hideEventButton.style.width='fit-content';//与innerText相适应
		hideEventButton.style.marginBottom='7px';
		hideEventButton.style.border='1px solid black';
		hideEventButton.style.backgroundColor='white';
		hideEventButton.style.padding='1px 4px';
		hideEventButton.onclick=function(){
			if(document.getElementById('hideEventContainer').childElementCount==1)
			{
				document.getElementById(eventName).style.display='';
				document.getElementById('hideEventContainer').remove();
			}
			else if(document.getElementById('hideEventContainer').childElementCount>1)
			{
				document.getElementById(eventName).style.display='';
				hideEventButton.remove();
			}
		}
		document.getElementById('hideEventContainer').appendChild(hideEventButton);
	}
}
function eventsDisplay(eventName)
{
	newEventAble();//首先检测是否有新事件可用
	if(eventName==null)
		eventName=randomEventSelctor();
	if((eventsAttribute[eventName]['available']==1&&document.querySelectorAll('.eventPopup').length==0)||(eventsAttribute[eventName]['available']==null))
	{
		eventsAttribute[eventName]['displayed']=1;
		//产生时间编号
		if(eventsAttribute[eventName]['fType']==1)
		{
			performEvent(eventName,null);//实现事件效果
			var popup = document.createElement('div');
			popup.className='eventPopup';
			popup.id=eventName;
			// create a new div element for the text
			var titleDiv = document.createElement('div');//标题
			titleDiv.innerText = eventsAttribute[eventName]['title'];
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
			contentDiv.innerText = eventsAttribute[eventName]['content'];
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
			confirmButton.style.fontSize = '1.5em';
			confirmButton.innerText = "confirm";
			confirmButton.addEventListener('click', function() {
				popup.remove(); // 点击关闭按钮时移除popup
			});
			popup.appendChild(confirmButton);
			//------------------------------------分割线----------------------------------------
			var container=document.createElement('div');
			container.style.position = 'absolute';
			container.style.top = '15px';
			container.style.right = '10px';
			container.style.height='30px';
			container.style.width='30px';
			container.onclick=function(){hideEvent(eventName);}
			popup.appendChild(container);

			var hideButton=document.createElement('div');
			hideButton.style.height='2.5px';
			hideButton.style.width='27px';
			hideButton.style.marginTop='15px';
			hideButton.style.backgroundColor='black';
			container.appendChild(hideButton);
			// 将popup添加到body中
			document.body.appendChild(popup);
		}
		else if(eventsAttribute[eventName]['fType']==2)//选择性事件
		{
			var popup = document.createElement('div');
    		popup.className='eventPopup';
			popup.id=eventName;
			// create a new div element for the text
			var titleDiv = document.createElement('div');//标题
			titleDiv.innerText = eventsAttribute[eventName]['title'];
			titleDiv.style.position = 'absolute';
			titleDiv.style.top = '10px';
			//titleDiv.style.left = '50px';
			titleDiv.style.fontSize = '22px';//字体大小
			titleDiv.style.left = '0';
			titleDiv.style.right = '0';
			titleDiv.style.textAlign = 'center';
			popup.appendChild(titleDiv);//将此文本加入到popup中
			//------------------------------------分割线----------------------------------------
			var contentDiv = document.createElement('div');//内容
			contentDiv.innerText = eventsAttribute[eventName]['content'];
			contentDiv.style.position = 'absolute';
			contentDiv.style.top = '70px';
			contentDiv.style.left = '50px';
			contentDiv.style.fontSize = '17px';//字体大小
			contentDiv.style.wordWrap = 'break-word';//自动换行
			contentDiv.style.maxWidth = 'calc(100% - 100px)';//距离右边界n px时换行,n=-50时达到右边界，
			popup.appendChild(contentDiv);//将此文本加入到popup中
			//------------------------------------分割线----------------------------------------
			//var buttonCount = Object.keys(eventsAttribute[eventName].button).length; // 按钮数量
			// 创建按钮容器
			var buttonContainer = document.createElement('div');
			buttonContainer.style.position = 'absolute';
			buttonContainer.style.bottom = '10px';
			buttonContainer.style.left = '0';
			buttonContainer.style.right = '0';
			buttonContainer.style.textAlign = 'center';

			// 创建按钮
			for (var key in eventsAttribute[eventName].button)
			{
				var button = document.createElement('button');
				button.innerText = eventsAttribute[eventName].button[key];
				button.style.height = '25px';
				button.style.marginTop='5px';
				button.style.background = 'none';
				button.style.border = '1px solid black';
				button.style.width = '280px';
				button.setAttribute('onclick',`performEvent('${eventName}','${key}')`);//用不了.onclick 似乎会不同的button共用一个function
				buttonContainer.appendChild(button);
				buttonContainer.appendChild(document.createElement('br'));
			}

			popup.appendChild(buttonContainer);

			var container=document.createElement('div');
			container.style.position = 'absolute';
			container.style.top = '15px';
			container.style.right = '10px';
			container.style.height='30px';
			container.style.width='30px';
			container.onclick=function(){hideEvent(eventName);}
			popup.appendChild(container);

			var hideButton=document.createElement('div');
			hideButton.style.height='2.5px';
			hideButton.style.width='27px';
			hideButton.style.marginTop='15px';
			hideButton.style.backgroundColor='black';
			container.appendChild(hideButton);

			document.body.appendChild(popup);
		}
		else if(eventsAttribute[eventName]['fType']==3)//贸易事件
		{
			var popup = document.createElement('div');
    		popup.className='eventPopup';
			popup.id=eventName;
			// create a new div element for the text
			var titleDiv = document.createElement('div');//标题
			titleDiv.innerText = eventsAttribute[eventName]['title'];
			titleDiv.style.position='absolute';
			titleDiv.style.marginTop = '10px';
			titleDiv.style.fontSize = '22px';//字体大小
			titleDiv.style.top='10px';
			titleDiv.style.left = '0';
			titleDiv.style.right = '0';
			titleDiv.style.textAlign = 'center';
			popup.appendChild(titleDiv);//将此文本加入到popup中
			//------------------------------------分割线----------------------------------------
			var contentDiv = document.createElement('div');//内容
			contentDiv.innerText = eventsAttribute[eventName]['content'];
			contentDiv.style.position='absolute';
			contentDiv.style.left = '50px';
			contentDiv.style.top='70px';
			contentDiv.style.fontSize = '17px';//字体大小
			contentDiv.style.wordWrap = 'break-word';//自动换行
			contentDiv.style.maxWidth = 'calc(100% - 100px)';//距离右边界n px时换行,n=-50时达到右边界，
			popup.appendChild(contentDiv);//将此文本加入到popup中
			//------------------------------------分割线----------------------------------------
			// 创建按钮容器
			var tradement=document.createElement('div');//交易的容器
			tradement.style.position='absolute';
			tradement.style.marginTop = '30px';
			tradement.style.left = '50px';
			tradement.style.right = '0';
			for (var key in tradeEventWare[eventName])
			{
				var buttonContainer = document.createElement('div');//每个交易的容器
				buttonContainer.style.position = 'relative';
				buttonContainer.style.left = '0';
				buttonContainer.style.right = '0';
				buttonContainer.style.marginBottom='5px';
				//------------------------------------------------------------------------
				var ware=document.createElement('span');//商品

				var wareName=document.createElement('span');
				wareName.id=eventName+'_'+key;
				wareName.innerText=tradeEventWare[eventName][key].name+':';
				wareName.style.padding='7px';
				wareName.setAttribute('onmouseover',`wareMsOn('${eventName}','${key}')`);//鼠标移上显示cost
				wareName.setAttribute('onmouseout',`wareMsOff('${eventName}','${key}')`);
				ware.appendChild(wareName);

				buttonContainer.appendChild(ware);
				var button1 = document.createElement('button');//1个
				button1.innerText = '购买1个';
				button1.style.padding='5px';
				button1.style.marginLeft='10px';
				button1.style.background = 'none';
				button1.style.border = '1px solid black';
				//button1.onclick=`performTradeEvents(${eventName},${i},'1')`;
				button1.setAttribute('onclick',`performTradeEvents('${eventName}','${key}',1)`);//设置按钮触发后的效果
				buttonContainer.appendChild(button1);
				var button5 = document.createElement('button');//5个
				button5.innerText = '购买5个';
				button5.style.padding='5px';
				button5.style.marginLeft='10px';
				button5.style.background = 'none';
				button5.style.border = '1px solid black';
				button5.setAttribute('onclick',`performTradeEvents('${eventName}','${key}',5)`);
				buttonContainer.appendChild(button5);
				var button10 = document.createElement('button');//10个
				button10.innerText = '购买10个';
				button10.style.padding='5px';
				button10.style.marginLeft='10px';
				button10.style.background = 'none';
				button10.style.border = '1px solid black';
				button10.setAttribute('onclick',`performTradeEvents('${eventName}','${key}',10)`);
				buttonContainer.appendChild(button10);
				tradement.appendChild(buttonContainer);
			}
			popup.appendChild(tradement);
			var confirmButton = document.createElement('button');
			confirmButton.style.position = 'absolute';
			confirmButton.style.bottom = '10px';
			confirmButton.style.right = '10px';
			confirmButton.style.border='1px solid black';
			confirmButton.style.background = 'none'; // 删除按钮背景
			confirmButton.style.fontSize = '1em';
			confirmButton.innerText = "confirm";
			confirmButton.addEventListener('click', function() {
				popup.remove(); // 点击关闭按钮时移除popup
			});
			popup.appendChild(confirmButton);

			var container=document.createElement('div');
			container.style.position = 'absolute';
			container.style.top = '15px';
			container.style.right = '10px';
			container.style.height='30px';
			container.style.width='30px';
			container.onclick=function(){hideEvent(eventName);}
			popup.appendChild(container);

			var hideButton=document.createElement('div');
			hideButton.style.height='2.5px';
			hideButton.style.width='27px';
			hideButton.style.marginTop='15px';
			hideButton.style.backgroundColor='black';
			container.appendChild(hideButton);

			document.body.appendChild(popup);
		}
	}
	newEventAble();
}
function randomEventSelctor()
{
	var type;//首先随机出type

	var prSum=0,coefficient,tempNum;
	var typeLength=Object.keys(cTypePr).length;
	prPrefixSum=new Array(typeLength+1);
	prPrefixSum[0]=0;
	var i=1;
	for(var key in cTypePr)
	{
		prSum+=Math.max(cTypePr[key],0);
		prPrefixSum[i]=Number(prPrefixSum[i-1]+Math.max(cTypePr[key],0));
		i++;
	}
	coefficient=1/prSum;
	coefficient=coefficient.toFixed(7);
	coefficient=Number(coefficient);
	randomPr=Math.random();
	for(var i=1;i<=typeLength;i++)
	{
		prPrefixSum[i]*=coefficient;
		if(prPrefixSum[i]>=randomPr)
			{tempNum=i;break;}
	}
	var i=1;
	for(var key in cTypePr)
	{
		if(tempNum==i)
			{type=key;break;}
		i++;
	}

	if(type=='none')
		return ;
	var eventName;//随机事件
	var prSum=0,coefficient,tempNum;
	var eventLength=Object.keys(randomEventList[type]).length;
	prPrefixSum=new Array(eventLength+1);
	prPrefixSum[0]=0;
	for(var i=1;i<=eventLength-1;i++)
	{
		prSum+=Math.max(eventsAttribute[randomEventList[type][i]]['probability'],0);
		prPrefixSum[i]=Number(prPrefixSum[i-1]+Math.max(eventsAttribute[randomEventList[type][i]]['probability'],0));
	}
	coefficient=1/prSum;
	coefficient=coefficient.toFixed(7);
	coefficient=Number(coefficient);
	randomPr=Math.random();

	for(var i=1;i<=eventLength-1;i++)
	{
		prPrefixSum[i]*=coefficient;
		if(prPrefixSum[i]>=randomPr)
			{eventName=randomEventList[type][i];break;}
	}
	return eventName;
}
function eventAvailableJudge(eventName)
{
	//前置事件(不是该事件的父事件)
	for(var i=0;i<eventCondition[eventName].preEvent.length;i++)
		if(eventsAttribute[eventCondition[eventName].preEvent[i]].displayed==0)
			return false;
	//最小产品
	for(var key in eventCondition[eventName].minProduct)
		if(production[key]<eventCondition[eventName].minProduct[key])
			return false;
	//前置建筑
	for(var i=0;i<eventCondition[eventName].preBuilding.length;i++)
		if(buildingAttribute[eventCondition[eventName].preBuilding[i]].num==0)
			return false;
	//前置工人
	for(var key in eventCondition[eventName].minWorker)
		if(worker[key]<eventCondition[eventName].minWorker[key])
			return false;
	if(population<eventCondition[eventName].minPop)
		return false;
	//前置buff
	for(var i=0;i<eventCondition[eventName]['preBuff'].length;i++)
		if(buffAttribute[eventCondition[eventName].preBuff[i]].working==0)
			return false;
	switch (eventName)//特殊情况
	{
		case 'chainEvent2':
			console.log('test');
			return false;
			break;
	
		default:
			break;
	}
	return true;
}
function eventChainGenerator()
{
	var pushQueue=[];
	for(var i=0;i<eventChainQueue.length;i++)
	{
		if(eventAvailableJudge()&&document.getElementById('eventsPopup')==null)
		{
			eventsDisplay(eventNameChainQueue[i]);
			if(eventChainQueue[i]==null)//如果这是事件链的最后一个
			{
				eventChainQueue[i]=-1,eventNameChainQueue[i]=-1;
				continue;
			}
			for(var key in eventChainQueue[i])
				eventNameChainQueue.push(key);
			var tempArray;
			tempArray=Object.values(eventChainQueue[i]);
			for(var j=0;j<tempArray.length;j++)
				pushQueue.push(tempArray[j]);
			eventChainQueue[i]=-1,eventNameChainQueue[i]=-1;
		}
	}
	//删除已发生事件
	eventChainQueue=eventChainQueue.filter(function(value){
		return value !== -1;
	});
	eventNameChainQueue=eventNameChainQueue.filter(function(value){
		return value !== -1;
	});
	for(var i=0;i<pushQueue.length;i++)//推入新事件
		eventChainQueue.push(pushQueue[i]);
}