function productMsOn(num)
{
    productionVariation();//更新一下以防万一
    if(document.getElementById('product'+num+'Detail')==null)
    {
        var rectangle = document.createElement('div');
        rectangle.className = 'rectangle';
        rectangle.setAttribute('id','product'+num+'Detail');
        if(popNeed['product'+num+'Num']!=0&&population!=0)
        {
            var need=document.createElement('div');
            if(Number(population*popNeed['product'+num+'Num'])!=Math.round(population*popNeed['product'+num+'Num']))
                need.innerText=population+'*'+'population'+':     '+(population*popNeed['product'+num+'Num']).toFixed(1);
            else if(Number(population*popNeed['product'+num+'Num'])==Math.round(population*popNeed['product'+num+'Num']))
                need.innerText=population+'*'+'population'+':     '+(population*popNeed['product'+num+'Num']);
            rectangle.appendChild(need);
        }
        for(var key in workersTable)
        {
            if(workersTable[key]['product'+num+'Num']!=0&&worker[key]!=0)
            {
                var produce=document.createElement('div');
                if(worker[key]==actualWrkNum[key])
                    produce.innerText=worker[key]+'*'+key+':     '+worker[key]*workersTable[key]['product'+num+'Num'];
                else if(worker[key]!=actualWrkNum[key])
                    produce.innerText=actualWrkNum[key]+'('+worker[key]+')*'+key+':     '+actualWrkNum[key]*workersTable[key]['product'+num+'Num'];
                rectangle.appendChild(produce);
                for(var keyb in produceBuffsEffect)
                {
                    //alert(produceBuffsEffect[keyb]['workerNum']+key);
                    if(produceBuffsEffect[keyb]['workerNum']==key&&document.getElementById('produceBuff'+keyb.replace('buff',''))!=null&&workersTable[key]['product'+num+'Num']>0)
                    {
                        var buff=document.createElement('div');
                        buff.style.marginLeft='15px';
                        if(produceBuffsEffect[keyb]['effect']<0)
                            buff.innerText='    '+produceBuffsContent[keyb]+':     '+produceBuffsEffect[keyb]['effect']+'%';
                        else if(produceBuffsEffect[keyb]['effect']>0)
                            buff.innerText='    '+produceBuffsContent[keyb]+':     +'+produceBuffsEffect[keyb]['effect']+'%';
                        rectangle.appendChild(buff);
                    }
                }
            }
            
        }
        document.getElementById('product'+num).appendChild(rectangle);
    }
}
function productMsOff(num)
{
    document.getElementById('product'+num+'Detail').remove();
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
    for (var i = 0; i < timers.length; i++)
	{
        if(i+1>worker['builder'])
            break;
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
                    if(timer.getAttribute('id')=='bldHouseTimer')
                        bldResult(1,null);
                    workingBuilder--;
					timer.parentNode.removeChild(timer);
					continue;
				}
			}
		}
		timer.textContent = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  }, 1000);