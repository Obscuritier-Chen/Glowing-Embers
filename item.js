function itemVariation(itemName,num)
{
    if(itemAttribute[itemName].num==0&&num<0)
        return;
    if(itemAttribute[itemName].num==0&&num>0)//新建item
    {
        itemAttribute[itemName].num+=num;
        var item=document.createElement('div');
        item.innerText=itemAttribute[itemName].name+':';
        document.getElementById('item').appendChild(item);

        var itemNum=document.createElement('div');
        itemNum.className='objectNum';
        itemNum.id=itemName+'Num';
        itemNum.innerText=itemAttribute[itemName].num;
        item.appendChild(itemNum);//100KB祭
    }
    else if(itemAttribute[itemName].num+num<=0)//删除item
    {
        itemAttribute[itemName].num=0;
        document.getElementById(itemName+'Num').parentNode.remove();
    }
    else if(itemAttribute[itemName].num>0&&num>0)
    {
        itemAttribute[itemName].num+=num;
        document.getElementById(itemName+'Num').innerText=itemAttribute[itemName].num;
    }
}
function craftItem(itemName)
{
    if(itemAttribute[itemName].time==-1)//没有制造时间
    {
        var tempFlag=true;
        for(var key in itemAttribute[itemName].need)
            if(production[key]<itemAttribute[itemName].need[key])
                {tempFlag=false; break;}
        if(tempFlag)
        {
            for(var key in itemAttribute[itemName].need)
                production[key]-=itemAttribute[itemName].need[key];
            itemVariation(itemName,1);
        }
    }
    else if(itemAttribute[itemName].time>0)
    {
        var tempFlag=true;
        for(var key in itemAttribute[itemName].need)
            if(production[key]<itemAttribute[itemName].need[key])
                {tempFlag=false; break;}
        if(tempFlag)
        {
            for(var key in itemAttribute[itemName].need)
                production[key]-=itemAttribute[itemName].need[key];
            document.getElementById(itemName).setAttribute('disabled',true);
            document.getElementById('craft_'+itemName+'Detail').remove();
            var craftTimer=document.createElement('span');
		    craftTimer.setAttribute('class','craftTimer');
		    craftTimer.setAttribute('id',itemName+'Timer');
		    craftTimer.style.marginLeft='5px';
		    craftTimer.style.color='black'
		    var h=Math.floor(itemAttribute[itemName].time/60/60),m=Math.floor(itemAttribute[itemName].time/60%60),s=itemAttribute[itemName].time%60;
		    craftTimer.innerText=`${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
		    document.getElementById(itemName).appendChild(craftTimer);
        }
    }
    for(var key in production)//刷新production显示
	{
		if(elementPro[key]=='xzx') continue;
		elementPro[key].innerText=parseInt(production[key]);
	}
    productionVariation();
	proVariationMonitor();
}
function newCraftBuilding(building)
{
    var craftBuilding=document.createElement('div');
    craftBuilding.id=building+'Craft';
    craftBuilding.className='craftBuilding';

    var text=document.createElement('div');
    text.style.marginBottom='10px';
    text.innerText=buildingAttribute[building].name+': ';

    var displayButton=document.createElement('button');
    displayButton.style.border='1px solid black';
    displayButton.style.backgroundColor='white';
    displayButton.setAttribute('onclick',`craftListDisplay(event,'${building+'Craft'}',-1)`);
    displayButton.innerText='隐藏';
    text.appendChild(displayButton);

    craftBuilding.appendChild(text);

    for(var key in itemAttribute)
    {
        if(itemAttribute[key].craftBuilding==building)
        {
            var tempFlag=true;
            for(var i=0;i<itemAttribute[key].preResearch.length;i++)
                if(researchProject[itemAttribute[key].preResearch[i]].condition==0)
                    {tempFlag=false; break;}
            if(tempFlag)
            {
                itemAttribute[key].craftCond=1;
                craftButton=document.createElement('button');
                craftButton.className='normalButton';
                craftButton.id=key;
                craftButton.setAttribute('onclick',`craftItem('${key}')`);
                craftButton.setAttribute('onmouseover',`craftMsOn('${key}')`);
                craftButton.setAttribute('onmouseout',`craftMsOff('${key}')`);
                craftButton.innerText=itemAttribute[key].name;

                craftBuilding.appendChild(craftButton);
            }
        }
    }

    document.getElementById('craftList').appendChild(craftBuilding);
}
function craftListDisplay(event,building,flag)
{
    var child=document.getElementById(building).children;//选择所有子元素
    for(var i=0;i<child.length;i++)
    {
        if(child[i].tagName=='BUTTON')//要大写 难绷
        {
            if(flag==1)
                child[i].style.display='';
            else if(flag==-1)
                child[i].style.display='none';
        }
    }
    if(flag==1)//显示->隐藏
    {
        event.target.innerText='隐藏';//event.target获取触发事件的元素
        event.target.setAttribute('onclick',`craftListDisplay(event,'${building}',${-flag})`);//更新新的onclick
    }
    else if(flag==-1)//隐藏->显示
    {
        event.target.innerText='显示';//event.target获取触发事件的元素
        event.target.setAttribute('onclick',`craftListDisplay(event,'${building}',${-flag})`);//更新新的onclick
    }
}