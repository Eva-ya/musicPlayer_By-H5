window.onload  = function  () {
	
/*----------初始化页面--------------*/	

var musicList = [{
		"src": "music/DC.mp3",
		"img": "img/dengChao.png",
		"musicName": "超级英雄",
		"name": "邓超"
	}, {
		"src": "music/TFBOYS.mp3",
		"img": "img/tf.png",
		"musicName": "大梦想家",
		"name": "tfboys"
	}, {
		"src": "music/MWW.mp3",
		"img": "img/mo.jpg",
		"musicName": "阴天",
		"name": "莫文蔚"
	}, {
		"src": "music/LYF.mp3",
		"img": "img/feng.jpg",
		"musicName": "年少有你",
		"name": "李易峰"
	}, {
		"src": "music/ZBC.mp3",
		"img": "img/bi.jpg",
		"musicName": "年轮",
		"name": "张碧晨"
	}, {
		"src": "music/G.E.M.mp3",
		"img": "img/deng.jpg",
		"musicName": "喜欢你",
		"name": "g.e.m.邓紫棋"
	}, {
		"src": "music/ZLY.mp3",
		"img": "img/zhangLiangYing.png",
		"musicName": "终于等到你",
		"name": "张靓颖"
	}, {
		"src": "music/JZW.mp3",
		"img": "img/jin.jpg",
		"musicName": "夏洛特烦恼",
		"name": "金志文"
	}, {
		"src": "music/Michael Learns To Rock - Take Me To Your Heart.mp3",
		"img": "img/take.png",
		"musicName": "t me to u heart",
		"name": "Michael"
	},{
		"src": "music/ZJL.mp3",
		"img": "img/zhouJL.png",
		"musicName": "算什么男人",
		"name": "周杰伦"
	}];


	var len = musicList.length;
	var ado = document.getElementById('ado');
	var range = document.getElementById('range');
	var allT = document.getElementById('allT');
	var currentT = document.getElementById('currentT');
	//1.循环创建li,插入到ul中，插入到section
	
	var oUl = document.createElement('ul');
	var section = document.querySelector('section');
	
	for(var i=0;i<=len-1;i++){
		
		var oLi = document.createElement('li');
		
		var str = '<span id="singer">'+musicList[i].name+'</span>-<span id="song">'+musicList[i].musicName+'</span>';
		oLi.innerHTML = str;
		
		oUl.appendChild(oLi);
		
	}
	
	section.appendChild(oUl);
	
	//2.把第一个li添加当前的curent类
	
	var first = document.querySelector('li:first-child');
	
	first.className = 'current';
	
	//初始值
	
	var all = ado.duration;
			
	var allM = Math.floor(parseInt(all)/60)>=10?(Math.floor(parseInt(all)/60)):('0'+Math.floor(parseInt(all)/60));
	
	var allS = Math.floor(parseInt(all)%60)>=10?(Math.floor(parseInt(all)%60)):('0'+Math.floor(parseInt(all)%60));
	
	/*console.log(allM)
	console.log(allS)*/
	
	//9.设置滑动条最大值为总时间
	range.max = parseInt(all);
	
	
	allT.innerHTML = allM + ':' + allS;
	
	

/*----------初始化页面--------------*/	


	//3.循环所有li,添加点击事件
	
	var aLi = document.querySelectorAll('li');
	var peoImg = document.getElementById('peoImg').getElementsByTagName('img')[0];
	
	var singerName = document.getElementById('singerName');
	var songName = document.getElementById('songName');

	var play = document.getElementById('play').getElementsByTagName('img')[0];
	
	//定义一个变量，代表播放的列表的下标
	var num;
	
	for(var i = 0;i<len;i++){
		
		aLi[i].index = i;
		
		aLi[i].onclick = function  () {
			
			//4.排他当前的类current
			for(var j = 0;j<len;j++){
				
				aLi[j].className = '';
				
			}
			this.className = 'current';
			
			//5。改当前播放的明星照片
			num = this.index;
			
			peoImg.src = musicList[num].img;
			
			
			//6.当前显示的播放的歌曲相关信息
			singerName.innerHTML = musicList[num].name;
			
			songName.innerHTML = musicList[num].musicName;
			
			
			//7.更改音乐
			
			ado.src = musicList[num].src;
			
			//8当前选中的音乐播放
			
			setTimeout(startP,200);
			
//			ado.addEventListener('canplay',startP);
			
		}
		
		function startP () {
			
			var all = ado.duration;
			
			var allM = Math.floor(parseInt(all)/60)>=10?(Math.floor(parseInt(all)/60)):('0'+Math.floor(parseInt(all)/60));
			
			var allS = Math.floor(parseInt(all)%60)>=10?(Math.floor(parseInt(all)%60)):('0'+Math.floor(parseInt(all)%60));
			
			/*console.log(allM)
			console.log(allS)*/
			
			//9.设置滑动条最大值为总时间
			range.max = parseInt(all);
			
			
			allT.innerHTML = allM + ':' + allS;
			
			ado.play();
			
			play.src = 'img/stop.png';
			
			ado.ontimeupdate = changeT;
			
		}
		function changeT () {
			
			var current = ado.currentTime;
			
			var currentM = Math.floor(parseInt(current)/60)>=10?Math.floor(parseInt(current)/60):('0'+Math.floor(parseInt(current)/60));
			var currentS = Math.floor(parseInt(current)%60)>=10?Math.floor(parseInt(current)%60):('0'+Math.floor(parseInt(current)%60));
			
			currentT.innerHTML = currentM +':'+currentS;
			
			//更改滑动条值
			
			range.value =  parseInt(current);
			
		}
		
		
		//10.给滑动条绑定时间
		
		/*range.onchange = function  () {
			
			var val = this.value;
			
			ado.currentTime = val;
			
		}*/
		
		range.oninput = function  () {
			
			var val = this.value;
			
			ado.currentTime = val;
			
			ado.ontimeupdate = changeT;
			
		}
		
		
		//控制播放
		play.onclick = function  () {
			
			
			if(ado.paused){
				//证明是暂停的状态
				ado.play();
				
				play.src = 'img/stop.png';
				
				ado.ontimeupdate = changeT;
				
			}else{
				//证明是播放的状态
				ado.pause();
				
				play.src = 'img/play.png';
				
			}
			
			
		}
		
		//上一首
		
		var pre = document.getElementById('pre');
		
		pre.onclick = function  () {
			
			num--;
			
			if(num<0){
				
				num = len-1;
				
			}
			
			//.ado的路径
			
			ado.src = musicList[num].src;
			
			//peoImg
			
			peoImg.src = musicList[num].img;
			
			//当前播放音乐
			
			
			//当前的current
			
			for(var j = 0;j<len;j++){
				
				aLi[j].className = '';
				
			}
			
			aLi[num].className = 'current';
			
			setTimeout(startP,200);
			
		}
		
		
		//下一首
		
		var next = document.getElementById('next');
		
		next.onclick = nextFn;
		
		//封装一个下一首
		
		function nextFn () {
			num++;
			
			if(num>len-1){
				
				num = 0;
				
			}
			
			//.ado的路径
			
			ado.src = musicList[num].src;
			
			//peoImg
			
			peoImg.src = musicList[num].img;
			
			//当前播放音乐
			
			
			//当前的current
			
			for(var j = 0;j<len;j++){
				
				aLi[j].className = '';
				
			}
			
			aLi[num].className = 'current';
			
			setTimeout(startP,200);
			
		}
		
		var volume = document.getElementById('volume');
		var volImg = volume.getElementsByTagName('img')[0];
		
		
		volImg.onclick = function  () {
			
			if(ado.muted){
				ado.muted = false;
				ado.volume = 1;
				
				this.src = 'img/vol.png';
			}else{
				ado.muted = true;
				ado.volume = 0;
				this.src = 'img/novol.png';
				
			}
			
		}
		
		var vol = document.getElementById('vol');
		
		vol.oninput = function  () {
			
			var val = this.value;
			
			ado.volume = val;
			console.log(ado.volume);
			
			if(val==0){
				
				volImg.src = 'img/novol.png';
				
			}else{
				volImg.src = 'img/vol.png';
			}
			
		}
		
		ado.onended = nextFn;
		
		
		
	}
	
	
	
	
	
}