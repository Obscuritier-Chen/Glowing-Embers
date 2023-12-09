function spResidentAdd(name,num)
{
    //num=Math.min(popLimit-population,num);
    //num=num>=0 ? num : 0; 
    //population+=num;
    population+=num;//允许超过popLimit
    document.getElementById('popNum').innerText=population;
    if(specialResident[name]==0&&document.getElementById(name+'Num')==null)//初次出现spResident,创建HTML
    {
        var newResident=document.createElement('div');
        newResident.innerText=name+':';
        document.getElementById('spResident').appendChild(newResident);

        var residentNum=document.createElement('div');
        residentNum.id=name+'Num';
        residentNum.className='objectNum';
        residentNum.innerText=specialResident[name];
        newResident.appendChild(residentNum);
    }
    specialResident[name]+=num;
    document.getElementById(name+'Num').innerText=specialResident[name];
}
function researcherSub(name,num)//处理各岗位researcher的sub
{
	var temp=Math.min(freeResearcher[name],num);
	freeResearcher[name]-=temp;
	num-=temp;
	var temp=Math.min(scienceAttribute[name],num);
	scienceAttribute[name]-=temp;
	num-=temp;
	if(document.getElementById('science'+name.replace(/researcher/gi, "Researcher")+'Num')!=null)//若分配面板未关 更新其HTML
		document.getElementById('science'+name.replace(/researcher/gi, "Researcher")+'Num').innerText=scienceAttribute[name];
	var temp=Math.min(engineeringAttribute[name],num);
	engineeringAttribute[name]-=temp;
	num-=temp;
	if(document.getElementById('engineering'+name.replace(/researcher/gi, "Researcher")+'Num')!=null)
		document.getElementById('engineering'+name.replace(/researcher/gi, "Researcher")+'Num').innerText=engineeringAttribute[name];
	var temp=Math.min(sociologyAttribute[name],num);
	sociologyAttribute[name]-=temp;
	if(document.getElementById('sociology'+name.replace(/researcher/gi, "Researcher")+'Num')!=null)
		document.getElementById('sociology'+name.replace(/researcher/gi, "Researcher")+'Num').innerText=sociologyAttribute[name];
	num-=temp;
}
function spResidentSub(name,num)
{
    if(name!=null)
    {
        num=Math.min(specialResident[name],num);
        population-=num;
        document.getElementById('popNum').innerText=population;
        specialResident[name]-=num;
        if(name=='researcherLv1'||name=='researcherLv2'||name=='researcherLv3')
            researcherSub(name,num);
        document.getElementById(name+'Num').innerText=specialResident[name];
    }
    else if(name==null)
    {
        for(var key in specialResident)
        {
            if(specialResident[key]==0)
                continue;
            var temp=Math.min(num,specialResident[key]);
            num-=temp;
            spResidentSub(key,temp);//似乎合理的递归
        }
    }
}