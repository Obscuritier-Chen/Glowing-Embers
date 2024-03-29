function buffDisable(name)
{
	if(buffAttribute[name]['condition']==1&&buffAttribute[name]['working']==1)
	{
		buffAttribute[name]['working']=0;
		document.getElementById(buffAttribute[name]['type']+'Buff'+name.replace(/^\w/, c => c.toUpperCase())).style.color='grey';
		if(buffAttribute[name]['type']=='event')
		{
			for(var key in buffAttribute[name].eventList)
				eventsAttribute[key].probability-=buffAttribute[name].eventList[key];
			for(var key in buffAttribute[name].typeList)
				cTypePr[key]-=buffAttribute[name].typeList[key];
		}
		else if(buffAttribute[name]['type']=='produce')
		{
			for(var key in buffAttribute[name].workerName)
			{
				if(key=='all')
				{
					for(var keyw in workerEfficient)
						workerEfficient[keyw]-=buffAttribute[name].workerName[key];
					continue;
				}
				workerEfficient[key]-=buffAttribute[name].workerName[key];
			}
			productionVariation('buff',null,null);
		}
		else if(buffAttribute[name]['type']=='population')
		{
			if(buffAttribute[name].effect>0)
				popVariationEff-=(buffAttribute[name].effect-100);
			else if(buffAttribute[name].effect<0)
				popDecreaseEff+=(buffAttribute[name].effect+100);
		}
	}
}
function buffAble(name)
{
	if(buffAttribute[name]['condition']==1&&buffAttribute[name]['working']==0)
	{
		buffAttribute[name]['working']=1;
		document.getElementById(buffAttribute[name]['type']+'Buff'+name.replace(/^\w/, c => c.toUpperCase())).style.color='';
		if(buffAttribute[name]['type']=='event')
		{
			for(var key in buffAttribute[name].eventList)
				eventsAttribute[key].probability+=buffAttribute[name].eventList[key];
			for(var key in buffAttribute[name].typeList)
				cTypePr[key]+=buffAttribute[name].typeList[key];
		}
		else if(buffAttribute[name]['type']=='produce')
		{
			for(var key in buffAttribute[name].workerName)
			{
				if(key=='all')
				{
					for(var keyw in workerEfficient)
						workerEfficient[keyw]+=buffAttribute[name].workerName[key];
					continue;
				}
				workerEfficient[key]+=buffAttribute[name].workerName[key];
			}
		}
		else if(buffAttribute[name]['type']=='population')
		{
			if(buffAttribute[name].effect>0)
				popVariationEff+=(buffAttribute[name].effect-100);
			else if(buffAttribute[name].effect<0)
				popDecreaseEff-=(buffAttribute[name].effect+100);
		}
	}
}
function removeBuff(name)
{
	if(buffAttribute[name].condition==0)
		return;
	buffAttribute[name]['condition']=0;
	buffAttribute[name]['working']=0;
	if(buffAttribute[name]['type']=='event')
	{
		for(var key in buffAttribute[name].eventList)
				eventsAttribute[key].probability-=buffAttribute[name].eventList[key];
		for(var key in buffAttribute[name].typeList)
			cTypePr[key]-=buffAttribute[name].typeList[key];
	}
	else if(buffAttribute[name]['type']=='produce')
	{
		for(var key in buffAttribute[name].workerName)
		{
			if(key=='all')
			{
				for(var keyw in workerEfficient)
					workerEfficient[keyw]-=buffAttribute[name].workerName[key];
				continue;
			}
			workerEfficient[key]-=buffAttribute[name].workerName[key];
		}
		productionVariation('buff',null,null);
	}
	else if(buffAttribute[name]['type']=='population')
	{
		if(buffAttribute[name].effect>0)
			popVariationEff-=(buffAttribute[name].effect-100);
		else if(buffAttribute[name].effect<0)
			popDecreaseEff+=(buffAttribute[name].effect+100);
	}
	document.getElementById(buffAttribute[name]['type']+'Buff'+name.replace(/^\w/, c => c.toUpperCase())).remove();
}
function addBuff(name)
{
	if(buffAttribute[name].condition==1)//如果buff已经存在
		return;
	if(buffAttribute[name]['type']=='event')
	{
		if(buffAttribute[name]['condition']==0)//.replace(/^\w/, c => c.toUpperCase())是首字母大写
		{
			buffAttribute[name]['condition']=1;
			buffAttribute[name]['working']=1;
			for(var key in buffAttribute[name].eventList)
				eventsAttribute[key].probability+=buffAttribute[name].eventList[key];
			for(var key in buffAttribute[name].typeList)
				cTypePr[key]+=buffAttribute[name].typeList[key];
			var buffDiv=document.createElement('div');//创建新buff 元素
			buffDiv.setAttribute('id','eventBuff'+name.replace(/^\w/, c => c.toUpperCase()));
			buffDiv.setAttribute('onmouseover',`buffMsOn('${name}')`);
			buffDiv.setAttribute('onmouseout',`buffMsOff('${name}')`);
			buffDiv.innerHTML=buffAttribute[name].name;
			if(buffAttribute[name]['duration']!=-1)
			{
				var h=Math.floor(buffAttribute[name]['duration']/60),m=buffAttribute[name]['duration']%60;
				buffDiv.innerHTML+=' <span class="timer">'+h+':'+(m < 10 ? '0' + m : m)+':00</span>';
			}
			document.getElementById("buffs").insertBefore(buffDiv,document.getElementById("buffLast"));/*insertbefore的. 前需要是buff
			last的上一级，假如bufflast被嵌套了*/

			if(buffAttribute[name]['duration']!=-1)
			{
				setTimeout(function(name){
					document.getElementById('eventBuff'+name.replace(/^\w/, c => c.toUpperCase())).remove();
					for(var key in buffAttribute[name].eventList)
						eventsAttribute[key].probability-=buffAttribute[name].eventList[key];
					for(var key in buffAttribute[name].typeList)
						cTypePr[key]-=buffAttribute[name].typeList[key];
					buffAttribute[name]['condition']=0
				},buffAttribute[name]['duration']*1000*60,name);
				//写这个破 时间结束就删除的玩意花了我一个晚上 
				//function里不能直接传参数会被立即执行 可以在setTimeout最后写上参数
			}
		}
	}
	else if(buffAttribute[name]['type']=='produce')
	{
		if(buffAttribute[name]['condition']==0)//.replace(/^\w/, c => c.toUpperCase())是首字母大写
		{
			buffAttribute[name]['condition']=1;
			buffAttribute[name]['working']=1;
			//workerEfficient[buffAttribute[name]['workerName']]+=buffAttribute[name]['effect'];
			for(var key in buffAttribute[name].workerName)
			{
				if(key=='all')
				{
					for(var keyw in workerEfficient)
						workerEfficient[keyw]+=buffAttribute[name].workerName[key];
					continue;
				}
				workerEfficient[key]+=buffAttribute[name].workerName[key];
			}
			var buffDiv=document.createElement('div');//创建新buff 元素
			buffDiv.setAttribute('id','produceBuff'+name.replace(/^\w/, c => c.toUpperCase()));
			buffDiv.setAttribute('onmouseover',`buffMsOn('${name}')`);
			buffDiv.setAttribute('onmouseout',`buffMsOff('${name}')`);
			buffDiv.innerHTML=buffAttribute[name].name;
			if(buffAttribute[name]['duration']!=-1)
			{
				var h=Math.floor(buffAttribute[name]['duration']/60),m=buffAttribute[name]['duration']%60;
				buffDiv.innerHTML+=' <span class="timer">'+h+':'+(m < 10 ? '0' + m : m)+':00</span>';
			}
			document.getElementById("buffs").insertBefore(buffDiv,document.getElementById("buffLast"));/*insertbefore的. 前需要是buff
			last的上一级，假如bufflast被嵌套了*/

			if(buffAttribute[name]['duration']!=-1)
			{
				setTimeout(function(name){
					document.getElementById('produceBuff'+name.replace(/^\w/, c => c.toUpperCase())).remove();
					for(var key in buffAttribute[name].workerName)
					{
						if(key=='all')
						{
							for(var keyw in workerEfficient)
								workerEfficient[keyw]-=buffAttribute[name].workerName[key];
							continue;
						}
						workerEfficient[key]-=buffAttribute[name].workerName[key];
					}
					buffAttribute[name]['condition']=0}
				,buffAttribute[name]['duration']*1000*60,name);
				//写这个破 时间结束就删除的玩意花了我一个晚上 
				//function里不能直接传参数会被立即执行 可以在setTimeout最后写上参数
			}
			productionVariation('buff',null,null);
		}
	}
	else if(buffAttribute[name]['type']=='population')
	{
		if(buffAttribute[name]['condition']==0)//.replace(/^\w/, c => c.toUpperCase())是首字母大写
		{
			buffAttribute[name]['condition']=1;
			buffAttribute[name]['working']=1;
			if(buffAttribute[name].effect>0)
				popVariationEff+=(buffAttribute[name].effect-100);
			else if(buffAttribute[name].effect<0)
				popDecreaseEff-=(buffAttribute[name].effect+100);
			var buffDiv=document.createElement('div');//创建新buff 元素
			buffDiv.id='populationBuff'+name.replace(/^\w/, c => c.toUpperCase());
			buffDiv.setAttribute('onmouseover',`buffMsOn('${name}')`);
			buffDiv.setAttribute('onmouseout',`buffMsOff('${name}')`);
			buffDiv.innerHTML=buffAttribute[name].name;
			if(buffAttribute[name]['duration']!=-1)
			{
				var h=Math.floor(buffAttribute[name]['duration']/60),m=buffAttribute[name]['duration']%60;
				buffDiv.innerHTML+=' <span class="timer">'+h+':'+(m < 10 ? '0' + m : m)+':00</span>';
			}
			document.getElementById("buffs").insertBefore(buffDiv,document.getElementById("buffLast"));/*insertbefore的. 前需要是buff
			last的上一级，假如bufflast被嵌套了*/

			if(buffAttribute[name]['duration']!=-1)
			{
				setTimeout(function(name){document.getElementById('populationBuff'+name.replace(/^\w/, c => c.toUpperCase())).remove();
					if(buffAttribute[name].effect>0)
						popVariationEff-=(buffAttribute[name].effect-100);
					else if(buffAttribute[name].effect<0)
						popDecreaseEff+=(buffAttribute[name].effect+100);
					buffAttribute[name]['condition']=0;
				},buffAttribute[name]['duration']*1000*60,name);
				//写这个破 时间结束就删除的玩意花了我一个晚上 
				//function里不能直接传参数会被立即执行 可以在setTimeout最后写上参数
			}
		}
	}
}