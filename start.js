function startInterface()//开始界面
{
    var newGameBtn = document.createElement('button');
    newGameBtn.setAttribute('class','normalButton');
    newGameBtn.setAttribute('onclick','newGame()');
    newGameBtn.innerText = 'New Game';
    newGameBtn.style.background = 'none';
    newGameBtn.style.display = 'block';
    var importFileBtn = document.createElement('button');
    importFileBtn.setAttribute('class','normalButton');
    importFileBtn.innerText = 'Import File';
    importFileBtn.style.background = 'none';
    importFileBtn.style.display = 'block';
    importFileBtn.style.marginTop = '20px';
    var container = document.createElement('div');
    container.setAttribute('id','startGameBtn');
    container.style.position='absolute'; 
    container.style.left= '50%';
    container.style.top='50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.appendChild(newGameBtn);
    container.appendChild(document.createElement('br'));
    container.appendChild(importFileBtn);
    document.body.appendChild(container);
}
function initialization()//加载后运行
{
	//document.querySelectorAll('body *').forEach(element => element.classList.add('hidden'));
	document.getElementById('popNum').innerText=population;//初始化人口
    //HTML初始化
    document.getElementById('researcherLv1Num').innerText=specialResident['researcherLv1'];
    document.getElementById('researcherLv2Num').innerText=specialResident['researcherLv2'];
    document.getElementById('researcherLv3Num').innerText=specialResident['researcherLv3'];
	document.getElementById('maxPop').innerText=popLimit;
    document.getElementById('jobless').innerText=production['jobless'];

    if(eventChainQueue.length==0)//初始化链式事件队列
    {
        eventChainQueue=Object.values(eventTree);
        for(var key in eventTree)
            eventNameChainQueue.push(key);
    }
        
    startInterface();
}
function beginningCourse()
{
    gameType='course';
    funcCondition.newBuilding=false;
    popLimit=5;
    document.getElementById('maxPop').innerText=popLimit;
    document.getElementById('middle').style.display='none';
    document.getElementById('right').style.display='none';
    document.querySelectorAll(".objectVariation").forEach(function(element) {
        element.style.display = "none";
    });//将产品变化量显示关闭 因为还未生产
    for(var key in proDisplay)
    {
        if(proDisplay[key]==1)
            elementPro[key].innerText=production[key];
    }
    document.getElementById('all').setAttribute('class','');
    infoPopup('courseInfo1');
    document.getElementById("courseInfo1Button").onclick=()=>{//连锁infoPopup 嵌套有点烦 但是好写
        infoPopup('plot1');
        document.getElementById('plot1Button').onclick=()=>{
            infoPopup('courseInfo3');
            document.getElementById('courseInfo3Button').onclick=()=>{
                document.getElementById('middle').style.display='';
                document.getElementById('build').style.display='flex';
                document.getElementById('bldHouse').style.display='none';
                document.getElementById('worker').style.display='none';
                document.getElementById('middleMiddle').style.display='none';
                document.getElementById('middleBottom').style.display='none';
                document.getElementById('build4').onmouseover='';//组织火堆rectangle的产生
            };
        };
    };
}
function course(courseName)
{
    switch (courseName)
    {
        case 'building4Complete':
            infoPopup('courseInfo4')
			population+=3;
			production.jobless+=3;
            document.getElementById('right').style.display='';
            var elementArray=[...document.querySelectorAll('#buffs, #item')];//批量选择element
            elementArray.forEach(element=>{
                element.style.display='none';
            });
			document.getElementById('popNum').innerText=population;
			document.getElementById('jobless').innerText=production.jobless;
            document.getElementById('bldHouse').style.display='';
            document.getElementById('courseInfo4').onclick=()=>{
                document.getElementById('worker').style.display='';
                infoPopup('courseInfo6');
                setInterval(produce(),proSpeed);//定期执行production
                document.querySelectorAll(".objectVariation").forEach(function(element) {
                    element.style.display = '';
                });
                productionVariation();
            };
            break;
        case 'buildHouse':
            infoPopup('courseInfo5');
            break;
        case 'houseComplete':
            infoPopup('courseInfo7');
            funcCondition.newBuilding=true;
            break;
        default:
            break;
    }
}
function newGame()
{
    document.getElementById('startGameBtn').remove();

    var popup = document.createElement('div');
	popup.setAttribute('id','info');
	popup.className='popup';
    document.body.appendChild(popup);

    var courseBtn=document.createElement('button');
    courseBtn.className='newGameButton';
    courseBtn.onclick=()=>{
        popup.remove();
        beginningCourse();
    };
    courseBtn.innerText='course';
    popup.appendChild(courseBtn);

    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createElement('br'));

    var skip=document.createElement('button');
    skip.className='newGameButton';
    skip.onclick=()=>{
        popup.remove();
        document.getElementById('all').setAttribute('class','');
        //setInterval(eventsDisplay,eventSpeed);
        setInterval(produce(),proSpeed);//定期执行production
        popUpdating=setInterval(popUpdate,popSpeed);
        gameType='normal';
    };
    skip.innerText='skip';
    popup.appendChild(skip);
    
}