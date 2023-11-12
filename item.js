function itemVariation(itemName,num)
{
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
            //这里还得有一句移除detail
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