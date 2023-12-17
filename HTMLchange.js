function infoPopup(name)
{
	if(infoPopupAttribute[name]['type']=='course'&&gameType!='course')//若非教程要弹出教程内容
		return;
	if(document.getElementById(name)==null)
	{
		var popup = document.createElement('div');
		popup.setAttribute('id',name);
		popup.className='popup';
		popup.style.width='250px';

		var title = document.createElement('div');
		title.style.textAlign = 'center';
		title.textContent = infoPopupAttribute[name]['title'];
		title.style.fontSize='20px';
		popup.appendChild(title);

		var content = document.createElement('div');
		content.style.marginTop = '10px';
		content.style.marginBottom='40px';
		content.style.fontSize = '15px';
		content.textContent = infoPopupAttribute[name]['content'];
		popup.appendChild(content);

		var confirmButton = document.createElement('button');
		confirmButton.setAttribute('id',name+'Button');
		confirmButton.className='popupConfirmButton';
		confirmButton.innerText = "confirm";
		confirmButton.addEventListener('click', function() {
			popup.remove(); // 点击关闭按钮时移除popup
		});
		popup.appendChild(confirmButton);

		document.body.appendChild(popup);
	}
}
function productMsOn(name)
{
    productionVariation();//更新一下以防万一
    if(document.getElementById(name+'Detail')==null)
    {
        var rectangle = document.createElement('div');
        rectangle.className = 'rectangle';
        rectangle.setAttribute('id',name+'Detail');

        if(popNeed[name+'Num']!=0&&population!=0)//人口需求
        {
            var need=document.createElement('div');
            if(Number(population*popNeed[name+'Num'])!=Math.round(population*popNeed[name+'Num']))
                need.innerText=population+'*'+'人口'+':     '+(population*popNeed[name+'Num']).toFixed(1);
            else if(Number(population*popNeed[name+'Num'])==Math.round(population*popNeed[name+'Num']))
                need.innerText=population+'*'+'人口'+':     '+(population*popNeed[name+'Num']);
            rectangle.appendChild(need);
        }
		for(var key in buildingAttribute)//建筑消耗
		{
			if(buildingAttribute[key]['consume']!=null&&buildingAttribute[key]['num']>0)
			{
				for(var keyp in buildingAttribute[key]['consume'])
				{
					if(keyp.replace(/Num/g, '')==name)
					{
						var bld=document.createElement('div')
						bld.innerText=buildingAttribute[key].name+':     '+buildingAttribute[key]['consume'][keyp];
						if(buildingAttribute[key]['condition']==0)
							bld.style.color='red';
						rectangle.appendChild(bld);
					}
				}
			}
		}
        for(var key in workersTable)//工人生产
        {
            if(workersTable[key][name+'Num']!=0&&worker[key]!=0)
            {
                var produce=document.createElement('div');
                if(worker[key]==actualWrkNum[key])
                    produce.innerText=worker[key]+'*'+workerZh[key]+':        '+worker[key]*workersTable[key][name+'Num'];
                else if(worker[key]!=actualWrkNum[key])
                    produce.innerText=actualWrkNum[key]+'('+worker[key]+')*'+workerZh[key]+':        '+actualWrkNum[key]*workersTable[key][name+'Num'];
                rectangle.appendChild(produce);
				if(workersTable[key][name+'Num']<0)//负生产无buff直接跳
					continue;
                for(var keyb in buffAttribute)
                {
					var tempCnt=0;
					if(buffAttribute[keyb]['type']!='produce')
						continue;
                    for(var keybw in buffAttribute[keyb].workerName)
						if((keybw==key||keybw=='all')&&buffAttribute[keyb]['condition']==1)
							tempCnt+=buffAttribute[keyb].workerName[keybw];
					var buff=document.createElement('div');
					buff.style.marginLeft='15px';
					if(tempCnt<0)
						buff.innerText='    '+buffAttribute[keyb].name+':     '+tempCnt+'%';
					else if(tempCnt>0)
						buff.innerText='    '+buffAttribute[keyb].name+':     +'+tempCnt+'%';
					if(buffAttribute[keyb]['working']==0)
						buff.style.color='red';
					rectangle.appendChild(buff);
                }
            }
        }
		if(rectangle.childNodes.length>0)
        	document.getElementById(name).appendChild(rectangle);
    }
}
function productMsOff(name)
{
	if(document.getElementById(name+'Detail')!=null)
    	document.getElementById(name+'Detail').remove();
}
function workerMsOn(name)
{
	if(document.getElementById(name+'Detail')==null)
	{
		var rectangle = document.createElement('div');
        rectangle.className = 'rectangle';
        rectangle.setAttribute('id',name+'Detail');
		var content=document.createElement('div');
		content.innerText=workerContent[name];
		content.style.fontSize='13px';
		rectangle.appendChild(content);

		//rectangle.appendChild(document.createElement('br'))
		for(var key in workersTable[name])
		{
			if(workersTable[name][key]==0)
				continue;
			var container=document.createElement('div');
			container.style.width='110px';
			container.innerText=productionZh[key]+':';

			var num=document.createElement('div');
			num.style.float='right';
			num.innerText=workersTable[name][key]
			container.appendChild(num);
			
			rectangle.appendChild(container);
		}
		if(rectangle.childElementCount!=1)
			content.style.marginBottom='3px';
		document.getElementById(name+'Name').appendChild(rectangle);
	}
}
function workerMsOff(name)
{
	if(document.getElementById(name+'Detail')!=null)
		document.getElementById(name+'Detail').remove();
}
function buildMsOn(name)
{
	if(document.getElementById(name+'Detail')==null)
	{
		var rectangle = document.createElement('div');
        rectangle.className = 'rectangle';
        rectangle.setAttribute('id',name+'Detail');
		//rectangle.style.whiteSpace='nowrap';

		var text=document.createElement('div');
		text.style.maxWidth='150px';
		text.style.overflowWrap='break-word';
		text.innerText=buildingAttribute[name]['text'];
		rectangle.appendChild(text);
		if(name=='house')
			document.getElementById('bldHouse').appendChild(rectangle);
		else
			document.getElementById(name.replace(/ing/g, "")).appendChild(rectangle);
		var need=document.createElement('div');
		need.style.whiteSpace='nowrap';
		if(Object.keys(buildingAttribute[name].need).length>0)
		{
			need.innerText='需要:';
			rectangle.appendChild(need);
			for(var key in buildingAttribute[name]['need'])
			{
				if(buildingAttribute[name]['need'][key]>0)
				{
					var product=document.createElement('div');
					product.style.whiteSpace='nowrap';//禁止换行 虽然不到为啥它会换行
					product.style.marginLeft='15px';
					product.innerText=productionZh[key]+':';
					if(proDisplay[key]==0)
						product.style.color='red';
					
					var num=document.createElement('div');
					num.className='buildRctNum';
					if(production[key]<buildingAttribute[name]['need'][key])
						num.style.color='red';
					num.innerText=buildingAttribute[name].need[key];
					product.appendChild(num);

					need.appendChild(product);
				}
			}
		}

		if(buildingAttribute[name].builderNeed>0)
		{
			var builder=document.createElement('div');
			builder.style.whiteSpace='nowrap';
			builder.innerText='建筑工人:';

			var num=document.createElement('div');
			num.className='buildRctNum';
			num.innerText=buildingAttribute[name].builderNeed;

			if(buildingAttribute[name]['builderNeed']>worker['builder']-workingBuilder)	
				num.style.color='red';
			builder.appendChild(num);

			rectangle.appendChild(builder);
		}
		
		var time=document.createElement('div');
		time.style.whiteSpace='nowrap';
		time.innerText='所需时间:';
		rectangle.appendChild(time);

		var num=document.createElement('div');
		num.className='buildRctNum';
		num.innerText=buildingAttribute[name].time+'s';
		time.appendChild(num);
	}
}
function buildMsOff(name)
{
	if(document.getElementById(name+'Detail')!=null)
		document.getElementById(name+'Detail').remove();
}
function buildingMsOn(name)
{
	if(document.getElementById(name+'Detail')==null)
	{
		var rectangle = document.createElement('div');
        rectangle.className = 'rectangle';
        rectangle.setAttribute('id',name+'Detail');
		rectangle.style.maxWidth='150px';
		rectangle.style.overflowWrap='break-word';

		var content=document.createElement('div');
		content.innerText=buildingAttribute[name]['text'];
		rectangle.appendChild(content);
		if(buildingAttribute[name]['consume']!=null)
		{
			var consumeContainer=document.createElement('div');
			consumeContainer.innerText='消耗:';
			for(var key in buildingAttribute[name]['consume'])
			{
				var consume=document.createElement('div');
				consume.style.marginLeft='15px';
				consume.innerText=productionZh[key]+':';
				
				var num=document.createElement('div');
				num.style.float='right';
				num.innerText=buildingAttribute[name].consume[key];
				consume.appendChild(num);

				consumeContainer.appendChild(consume);
			}
			rectangle.appendChild(consumeContainer);
		}
		document.getElementById(name).appendChild(rectangle);
	}
}
function buildingMsOff(name)
{
	if(document.getElementById(name+'Detail')!=null)
		document.getElementById(name+'Detail').remove();
}
function researchMsOn(name)
{
	if(document.getElementById(name+'Detail')==null)
	{
		var rectangle=document.createElement('div');
		rectangle.className='rectangle';
		rectangle.style.minWidth='105px';
		rectangle.setAttribute('id',name+'Detail');
		rectangle.style.whiteSpace='nowrap';

		var text=document.createElement('div');
		text.innerText=researchProject[name]['text'];
		rectangle.appendChild(text);

		if(researchProject[name].consume!=null)
		{
			var consume=document.createElement('div');
			consume.style.whiteSpace='nowrap';
			consume.innerText='需要:';
			for(var key in researchProject[name]['consume'])
			{
				var product=document.createElement('div');
				product.style.marginLeft='15px';
				product.innerText=productionZh[key]+':';

				var num=document.createElement('div');
				num.className='buildRctNum';
				num.innerText=researchProject[name].consume[key];
				product.appendChild(num);

				consume.appendChild(product);
			}
			rectangle.appendChild(consume);
		}
		var time=document.createElement('div');
		time.style.whiteSpace='nowrap';
		time.innerText='研究时间:';

		var num=document.createElement('div');
		num.className='buildRctNum';
		num.innerText=researchProject[name].time;
		time.appendChild(num);

		rectangle.appendChild(time);

		document.getElementById(name).appendChild(rectangle);
	}
}
function researchMsOff(name)
{
	if(document.getElementById(name+'Detail')!=null)
		document.getElementById(name+'Detail').remove();
}
function buffMsOn(name)
{
	if(document.getElementById(name+'Detail')==null)
	{
		var rectangle=document.createElement('div');
		rectangle.className='rectangle';
		rectangle.setAttribute('id',name+'Detail');
		rectangle.style.whiteSpace='nowrap';

		if(buffAttribute[name]['working']==0)
		{
			var wrkCondition=document.createElement('div');
			wrkCondition.innerText='失效的';
			rectangle.appendChild(wrkCondition);
		}

		var content=document.createElement('div');
		content.innerText=buffAttribute[name]['content'];
		rectangle.appendChild(content);

		var type=document.createElement('div');
		if(buffAttribute[name].type=='event')
			type.innerText='类型:  事件';
		else if(buffAttribute[name].type=='produce')
			type.innerText='类型:  生产';
		else if(buffAttribute[name].type=='population')
			type.innerText='类型:  人口';
		rectangle.appendChild(type);

		var effect=document.createElement('div');
		effect.innerText='效果:';
		if(buffAttribute[name]['type']=='event')
		{
			var eventEffect=document.createElement('div');
			eventEffect.style.marginLeft='15px';
			for(var key in buffAttribute[name].typeList)
			{
				var type=document.createElement('div');
				type.innerText=key+'类:';

				var num=document.createElement('div');
				num.style.float='right';
				num.innerText=(buffAttribute[name].typeList[key]>0 ? '+' : '')+buffAttribute[name].typeList[key]+'%';
				type.appendChild(num);

				eventEffect.appendChild(type);
			}
			for(var key in buffAttribute[name].eventList)
			{
				var event=document.createElement('div');
				event.innerText=key+':';

				var num=document.createElement('div');
				num.style.float='right';
				num.innerText=(buffAttribute[name].eventList[key]>0 ? '+' : '')+buffAttribute[name].eventList[key]+'%';
				event.appendChild(num);

				eventEffect.appendChild(event);
			}
			effect.appendChild(eventEffect);
		}
		else if(buffAttribute[name]['type']=='produce')
		{
			var produceEffect=document.createElement('div');
			produceEffect.style.marginLeft='15px';

			for(var key in buffAttribute[name].workerName)
			{
				var worker=document.createElement('div');
				if(key=='all')
					worker.innerText='全体:'
				else
					worker.innerText=workerZh[key]+':';

				var num=document.createElement('div');
				num.style.float='right';
				num.innerText=(buffAttribute[name].workerName[key]>0 ? '+' :'')+buffAttribute[name].workerName[key]+'%';
				worker.appendChild(num);

				produceEffect.appendChild(worker);
			}

			effect.appendChild(produceEffect);
		}
		rectangle.appendChild(effect);

		document.getElementById(buffAttribute[name]['type']+'Buff'+name.replace(/^\w/, c => c.toUpperCase())).appendChild(rectangle);
	}
}
function buffMsOff(name)
{
	if(document.getElementById(name+'Detail')!=null)
		document.getElementById(name+'Detail').remove();
}
function wareMsOn(eventName,ware)
{
	if(document.getElementById(eventName+'_'+ware+'Detail')==null)
	{
		var rectangle=document.createElement('div');
		rectangle.className='rectangle';
		rectangle.setAttribute('id',eventName+'_'+ware+'Detail');
		rectangle.style.whiteSpace='nowrap';

		var text=document.createElement('div');
		text.innerText='需要:';
		rectangle.appendChild(text);

		for(var key in tradeEventWare[eventName][ware].cost)
		{
			var cost=document.createElement('div');
			cost.innerHTML=productionZh[key]+':&nbsp;&nbsp;&nbsp;&nbsp;'+tradeEventWare[eventName][ware].cost[key];
			rectangle.appendChild(cost);
		}
		document.getElementById(eventName+'_'+ware).appendChild(rectangle);
	}
}
function wareMsOff(eventName,ware)
{
	if(document.getElementById(eventName+'_'+ware+'Detail')!=null)
		document.getElementById(eventName+'_'+ware+'Detail').remove();
}
function craftMsOn(itemName)
{
	if(document.getElementById('craft_'+itemName+'Detail')==null)
	{
		var rectangle=document.createElement('div');
		rectangle.className='rectangle';
		rectangle.id='craft_'+itemName+'Detail';
		rectangle.style.whiteSpace='nowrap';
		rectangle.style.minWidth='120px';

		var text=document.createElement('div');
		text.innerText=itemAttribute[itemName].text;
		rectangle.appendChild(text);

		var needContainer=document.createElement('div');
		needContainer.innerText='需要:';
		rectangle.appendChild(needContainer);

		for(var key in itemAttribute[itemName].need)
		{
			var need=document.createElement('div');
			need.style.marginLeft='15px';
			need.innerText=productionZh[key]+': ';

			var num=document.createElement('div');
			num.className='buildRctNum';
			num.innerText=itemAttribute[itemName].need[key];
			need.appendChild(num);

			needContainer.appendChild(need);
		}

		var time=document.createElement('div');
		time.innerText='制造时间: ';

		var num=document.createElement('div');
		num.className='buildRctNum';
		num.innerText=(itemAttribute[itemName].time>0? itemAttribute[itemName].time : '0')  +'s';
		time.appendChild(num);
		
		rectangle.appendChild(time);

		document.getElementById(itemName).appendChild(rectangle);
	}
}
function craftMsOff(itemName)
{
	if(document.getElementById('craft_'+itemName+'Detail')!=null)
		document.getElementById('craft_'+itemName+'Detail').remove();
}
setInterval(function(){   //所有class=timer的元素时间-1s
    var timers = document.querySelectorAll('.timer');
    for (var i = 0; i < timers.length; i++)
	{
    	var timer = timers[i];
		var time = timer.textContent.split(':');
		var hours = parseInt(time[0], 10);
		var minutes = parseInt(time[1], 10);
		var seconds = parseInt(time[2], 10);
		if (seconds > 0)
		{
			seconds--;
		} 
		else 
		{
			if (minutes > 0)
			{
				minutes--;
				seconds = 59;
			}
			else
			{
				if (hours > 0)
				{
					hours--;
					minutes = 59;
					seconds = 59;
				}
				else
				{
					timer.parentNode.removeChild(timer);
					continue; 
				}
			}
		}
		timer.textContent = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  }, 1000);
setInterval(function(){   //所有class=timer的元素时间-1s
    var timers = document.querySelectorAll('.bldTimer');
	var need=0;
    for (var i = 0; i < timers.length; i++)
	{
		var timer = timers[i];
		need+=buildingAttribute[timer.getAttribute('id').replace(/Timer/g, '')]['builderNeed'];
        if(need>worker['builder'])
            break;
		var time = timer.textContent.split(':');
		var hours = parseInt(time[0], 10);
		var minutes = parseInt(time[1], 10);
		var seconds = parseInt(time[2], 10);
		if (seconds > 0)
		{
			seconds--;
		} 
		else 
		{
			if (minutes > 0)
			{
				minutes--;
				seconds = 59;
			}
			else
			{
				if (hours > 0)
				{
					hours--;
					minutes = 59;
					seconds = 59;
				}
				else
				{
                    if(buildingAttribute[timer.getAttribute('id').replace(/Timer/g, '')]['type']==1)
                        bldResult(1,'house');
					else if(buildingAttribute[timer.getAttribute('id').replace(/Timer/g, '')]['type']!=1)
						bldResult(buildingAttribute[timer.getAttribute('id').replace(/Timer/g, '')]['type'],timer.getAttribute('id').replace(/Timer/g, ''));
                    workingBuilder-=buildingAttribute[timer.getAttribute('id').replace(/Timer/g, '')]['builderNeed'];
					timer.parentNode.removeChild(timer);
					continue;
				}
			}
		}
		timer.textContent = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  }, 1000);
setInterval(function(){
    var timers = document.querySelectorAll('.rsrTimer');
    for (var i = 0; i < timers.length; i++)
	{
    	var timer = timers[i];
		var time = timer.textContent.split(':');
		var hours = parseInt(time[0], 10);
		var minutes = parseInt(time[1], 10);
		var seconds = parseInt(time[2], 10);
		var totalTime=hours*60*60+minutes*60+seconds;
		totalTime=totalTime-(window[timer.parentElement.parentElement.id+'Attribute']['researcherLv1']*researchSpeed['researcherLv1']+
							 window[timer.parentElement.parentElement.id+'Attribute']['researcherLv2']*researchSpeed['researcherLv2']+
							 window[timer.parentElement.parentElement.id+'Attribute']['researcherLv3']*researchSpeed['researcherLv3']);
		hours=parseInt(totalTime/60/60),minutes=parseInt(totalTime/60%60),seconds=totalTime%60;
		if(totalTime<=0)
		{
			hours=0,minutes=0,seconds=0;
			timer.parentNode.removeChild(timer);
			researchResult(timer.getAttribute('id').replace(/Timer/g, ''));
		}
		timer.textContent = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  }, 1000);
setInterval(function(){
    var timers = document.querySelectorAll('.craftTimer');
    for (var i = 0; i < timers.length; i++)
	{
    	var timer = timers[i];
		var time = timer.textContent.split(':');
		var hours = parseInt(time[0], 10);
		var minutes = parseInt(time[1], 10);
		var seconds = parseInt(time[2], 10);
		var totalTime=hours*60*60+minutes*60+seconds;
		totalTime--;
		hours=parseInt(totalTime/60/60),minutes=parseInt(totalTime/60%60),seconds=totalTime%60;
		if(totalTime<=0)
		{
			hours=0,minutes=0,seconds=0;
			timer.parentNode.removeChild(timer);
			document.getElementById(timer.getAttribute('id').replace(/Timer/g, '')).removeAttribute('disabled');
			itemVariation(timer.getAttribute('id').replace(/Timer/g, ''),1);
		}
		timer.textContent = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  }, 1000);
