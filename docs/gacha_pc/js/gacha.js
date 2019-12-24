function returnHit(state) {
	switch(state) {
		case 0:
			return "jackpot";
			break
		case 1:
			return "hit";
			break
	}
}
function returnPresentText(state) {
	switch(state) {
		case 0:
			return "メッセージ無料券";
			break;
		case 2:
			return "プロフィール無料券";
			break;
		case 3:
			return "初回メッセージ<br>1時間送り放題";
			break;
		case 4:
			return "プレミアムオプション<br>30日分無料";
			break;
		case 5:
			return "YYCポイント1,000pt";
			break;
	}
}

function Gacha(obj) {
	this.status = obj
	this.app = document.querySelector('.gacha_app')
	this.setTicket = function() {
		var hasTicket = document.querySelector('#hasTicket');
		hasTicket.innerHTML = this.status.ticket
	}
	this.showShortage = function() {
		var shortageOverlay = document.querySelector('.shortage_overlay');
		shortageOverlay.classList.add('open');
		shortageOverlay.addEventListener('click',function(){
			this.classList.remove('open');
		})
		shortageOverlay.querySelector('.shortage_wrap')
		.addEventListener('click',function(e){
			e.stopPropagation();
		})
	}
	this.startJudge = function() {
		var cnst = this; 
		var form = document.forms.gacha_form;
		form.addEventListener('submit',function(e){
			e.preventDefault();
			if (cnst.status.ticket > 0) {
				this.submit();
			} else {
				cnst.showShortage();
			}
		})
	}
}
Gacha.prototype.resultDetail = function() {
	var cnst = this;
	var app = cnst.app;
	var changeImg = app.querySelector('#changeImg');
	var presentText = app.querySelector('#setPresentText');
	var resultWrap = app.querySelector('.result_wrap');
	var hitName = returnHit(cnst.status.result)
	window.addEventListener('load',function(){
		resultWrap.classList.add(hitName)
		changeImg.src = "./img/gacha_animation_" + hitName + ".gif";
		presentText.innerHTML = returnPresentText(cnst.status.present);
		var animationEnd = setTimeout(function(){
			var btn = app.querySelector('.btn_wrap .gacha');
			resultWrap.classList.add('open');
			btn.disabled = false
			clearTimeout(animationEnd)
		},4500);
	})
}
Gacha.prototype.setIndex = function() {
	this.setTicket();
	this.startJudge();
}
Gacha.prototype.setResult = function() {
	this.setTicket();
	this.startJudge();
	this.resultDetail();
}