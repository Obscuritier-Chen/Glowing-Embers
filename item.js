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
        itemNum.id=itemName;
        itemNum.innerText=itemAttribute[itemName].num;
        item.appendChild(itemNum);//100KB祭
    }
}