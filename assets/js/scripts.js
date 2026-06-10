$(document).ready(function () {

$('#dismiss, .overlay').on('click', function () {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
    $("body").removeClass('no-scrolling');
    $(".open-menu").html('<p class="mobile-menu header-link mr-4 my-auto"><i class="fa-solid fa-bars"></i></p>')

});

$('.open-menu').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('.overlay').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $("body").toggleClass('no-scrolling');
    $(".open-menu").toggleHtml(this,'<p class="mobile-menu header-link mr-4 my-auto"><i class="fa-solid fa-xmark"></i></p>','<p class="mobile-menu header-link mr-4 my-auto"><i class="fa-solid fa-bars"></i></p>')
});
});

$.fn.toggleHtml = function(me,t1, t2){
  if ($(me).html() == t1){
        $(me).html(t2)
  } else {
    $(me).html(t1);
  }
};

if($(".review-container-one").length >0 ){
const reviewsContainer = document.getElementsByClassName('review-container-one')[0];
const ReviewsScrollWidth = reviewsContainer.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (reviewsContainer.scrollLeft !== ReviewsScrollWidth) {
      reviewsContainer.scrollTo(reviewsContainer.scrollLeft + 1, 0);
    } else {
        reviewsContainer.scrollTo(0, 0); 
    }
  }, 30);
});
const reviewsContainer2 = document.getElementsByClassName('review-container-two')[0];
const ReviewsScrollWidth2 = reviewsContainer2.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (reviewsContainer2.scrollLeft !== ReviewsScrollWidth2) {
      reviewsContainer2.scrollTo(reviewsContainer2.scrollLeft + 1, 0);
    } else {
        reviewsContainer2.scrollTo(0, 0); 
    }
  }, 30);
});
const reviewsContainer3 = document.getElementsByClassName('review-container-three')[0];
const ReviewsScrollWidth3 = reviewsContainer3.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (reviewsContainer3.scrollLeft !== ReviewsScrollWidth3) {
      reviewsContainer3.scrollTo(reviewsContainer3.scrollLeft + 1, 0);
    } else {
        reviewsContainer3.scrollTo(0, 0); 
    }
  }, 30);
});
}

q_count = 1;
a_count = 1;
$('.faq-question').each(function( index ) {
$(this).attr('href','#faq_'+q_count)
q_count++
})
$('.faq-answer').each(function( index ) {
$(this).attr('id','faq_'+a_count)
a_count++
})

function submit_custom_form(me){
    var form_response = [];
    var validate = 0;
    $('.custom-form-outer:visible').each(function( index ) {
    var Label = $(this).find('label').text()
    var Value = $(this).find('.custom-form-input').val()
    var Input = $(this).find('.custom-form-input')
    $(Input).removeClass('border-danger')
    if($(this).hasClass('validate-text')){
        if(Value == ''){
            $(Input).addClass('border-danger')
            validate++
        }
    } else if ($(this).hasClass('validate-email')){
        if(!isEmail(Value)){
            $(Input).addClass('border-danger')
            validate++
        }
    } else if ($(this).hasClass('validate-phone')){
        if(!isPhone(Value)){
            $(Input).addClass('border-danger')
            validate++
        }
    }
        form_response.push([Label,Value])
    })
    var form_response = JSON.stringify(form_response)
    if(validate == 0){
    $(me).html("<i class='fa-solid fa-circle-notch fa-spin mr-2'></i> Submitting form...")

    $.ajax({
        type: "POST",
        url: Home_URL+"/assets/php/submit_form.php",
        data: {
            form_response
        },
        success: function(returnData) {
            $(me).html("<i class='fa-regular fa-circle-check mr-2'></i> Form Submitted")
            $(me).prop('disabled',true)
            $('.custom-form-input:visible').prop('disabled',true)
        }
    })
    }
}
function submit_custom_contact_form(me){
    var form_response = [];
    var validate = 0;
    $('.custom-form-outer:visible').each(function( index ) {
    var Label = $(this).find('span').text()
    var Value = $(this).find('.custom-form-input').val()
    var Input = $(this).find('.custom-form-input')
    $(Input).removeClass('border-danger')
    if($(this).hasClass('validate-text')){
        if(Value == ''){
            $(Input).addClass('border-danger')
            validate++
        }
    } else if ($(this).hasClass('validate-email')){
        if(!isEmail(Value)){
            $(Input).addClass('border-danger')
            validate++
        }
    } else if ($(this).hasClass('validate-phone')){
        if(!isPhone(Value)){
            $(Input).addClass('border-danger')
            validate++
        }
    }
        form_response.push([Label,Value])
    })
    var form_response = JSON.stringify(form_response)
    if(validate == 0){
    $(me).html("<i class='fa-solid fa-circle-notch fa-spin mr-2'></i> Submitting form...")

    $.ajax({
        type: "POST",
        url: Home_URL+"/assets/php/submit_form.php",
        data: {
            form_response
        },
        success: function(returnData) {
            $(me).html("<i class='fa-regular fa-circle-check mr-2'></i> Form Submitted")
            $(me).prop('disabled',true)
            $('.custom-form-input:visible').prop('disabled',true)
        }
    })
    }
}
!function(t,a,e){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports&&"undefined"==typeof Meteor?module.exports=t(require("jquery")):t(a||e)}(function(o){"use strict";function i(u,M,y){var s,b={invalid:[],getCaret:function(){try{var t,a=0,e=u.get(0),n=document.selection,s=e.selectionStart;return n&&-1===navigator.appVersion.indexOf("MSIE 10")?((t=n.createRange()).moveStart("character",-b.val().length),a=t.text.length):!s&&"0"!==s||(a=s),a}catch(t){}},setCaret:function(t){try{var a,e;u.is(":focus")&&((e=u.get(0)).setSelectionRange?e.setSelectionRange(t,t):((a=e.createTextRange()).collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select()))}catch(t){}},events:function(){u.on("keydown.mask",function(t){u.data("mask-keycode",t.keyCode||t.which),u.data("mask-previus-value",u.val()),u.data("mask-previus-caret-pos",b.getCaret()),b.maskDigitPosMapOld=b.maskDigitPosMap}).on(o.jMaskGlobals.useInput?"input.mask":"keyup.mask",b.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){u.keydown().keyup()},100)}).on("change.mask",function(){u.data("changed",!0)}).on("blur.mask",function(){r===b.val()||u.data("changed")||u.trigger("change"),u.data("changed",!1)}).on("blur.mask",function(){r=b.val()}).on("focus.mask",function(t){!0===y.selectOnFocus&&o(t.target).select()}).on("focusout.mask",function(){y.clearIfNotMatch&&!s.test(b.val())&&b.val("")})},getRegexMask:function(){for(var t,a,e,n,s,r=[],o=0;o<M.length;o++)(e=w.translation[M.charAt(o)])?(t=e.pattern.toString().replace(/.{1}$|^.{1}/g,""),a=e.optional,(e=e.recursive)?(r.push(M.charAt(o)),n={digit:M.charAt(o),pattern:t}):r.push(a||e?t+"?":t)):r.push(M.charAt(o).replace(/[-\/\^$*+?.()|[\]{}]/g,"\$&"));return s=r.join(""),n&&(s=s.replace(new RegExp("("+n.digit+"(.*"+n.digit+")?)"),"($1)?").replace(new RegExp(n.digit,"g"),n.pattern)),new RegExp(s)},destroyEvents:function(){u.off(["input","keydown","keyup","paste","drop","blur","focusout",""].join(".mask "))},val:function(t){var a=u.is("input")?"val":"text",t=0<arguments.length?(u[a]()!==t&&u[a](t),u):u[a]();return t},calculateCaretPosition:function(t){var a=b.getMasked(),e=b.getCaret();if(t!==a){for(var n=u.data("mask-previus-caret-pos")||0,s=a.length,a=t.length,r=0,o=0,i=0,l=0,c=0,c=e;c<s&&b.maskDigitPosMap[c];c++)o++;for(c=e-1;0<=c&&b.maskDigitPosMap[c];c--)r++;for(c=e-1;0<=c;c--)b.maskDigitPosMap[c]&&i++;for(c=n-1;0<=c;c--)b.maskDigitPosMapOld[c]&&l++;a<e?e=10*s:e<=n&&n!==a?b.maskDigitPosMapOld[e]||(t=e,b.maskDigitPosMap[e=e-(l-i)-r]&&(e=t)):n<e&&(e=e+(i-l)+o)}return e},behaviour:function(t){t=t||window.event,b.invalid=[];var a,e,n=u.data("mask-keycode");if(-1===o.inArray(n,w.byPassKeys))return n=b.getMasked(),a=b.getCaret(),e=u.data("mask-previus-value")||"",setTimeout(function(){b.setCaret(b.calculateCaretPosition(e))},o.jMaskGlobals.keyStrokeCompensation),b.val(n),b.setCaret(a),b.callbacks(t)},getMasked:function(t,a){for(var e,n,s=[],r=void 0===a?b.val():a+"",o=0,i=M.length,l=0,c=r.length,u=1,k="push",p=-1,d=0,f=[],h=y.reverse?(k="unshift",u=-1,e=0,o=i-1,l=c-1,function(){return-1<o&&-1<l}):(e=i-1,function(){return o<i&&l<c});h();){var v=M.charAt(o),g=r.charAt(l),m=w.translation[v];m?(g.match(m.pattern)?(s[k](g),m.recursive&&(-1===p?p=o:o===e&&o!==p&&(o=p-u),e===p)&&(o-=u),o+=u):g===n?(d--,n=void 0):m.optional?(o+=u,l-=u):m.fallback?(s[k](m.fallback),o+=u,l-=u):b.invalid.push({p:l,v:g,e:m.pattern}),l+=u):(t||s[k](v),g===v?(f.push(l),l+=u):(n=v,f.push(l+d),d++),o+=u)}a=M.charAt(e),i!==c+1||w.translation[a]||s.push(a),a=s.join("");return b.mapMaskdigitPositions(a,f,c),a},mapMaskdigitPositions:function(t,a,e){var n=y.reverse?t.length-e:0;b.maskDigitPosMap={};for(var s=0;s<a.length;s++)b.maskDigitPosMap[a[s]+n]=1},callbacks:function(t){function a(t,a,e){"function"==typeof y[t]&&a&&y[t].apply(this,e)}var e=b.val(),n=e!==r,s=[e,t,u,y];a("onChange",!0==n,s),a("onKeyPress",!0==n,s),a("onComplete",e.length===M.length,s),a("onInvalid",0<b.invalid.length,[e,t,u,b.invalid,y])}},w=(u=o(u),this),r=b.val();M="function"==typeof M?M(b.val(),void 0,u,y):M,w.mask=M,w.options=y,w.remove=function(){var t=b.getCaret();return w.options.placeholder&&u.removeAttr("placeholder"),u.data("mask-maxlength")&&u.removeAttr("maxlength"),b.destroyEvents(),b.val(w.getCleanVal()),b.setCaret(t),u},w.getCleanVal=function(){return b.getMasked(!0)},w.getMaskedVal=function(t){return b.getMasked(!1,t)},w.init=function(t){if(t=t||!1,y=y||{},w.clearIfNotMatch=o.jMaskGlobals.clearIfNotMatch,w.byPassKeys=o.jMaskGlobals.byPassKeys,w.translation=o.extend({},o.jMaskGlobals.translation,y.translation),w=o.extend(!0,{},w,y),s=b.getRegexMask(),t)b.events(),b.val(b.getMasked());else{y.placeholder&&u.attr("placeholder",y.placeholder),u.data("mask")&&u.attr("autocomplete","off");for(var a=0,e=!0;a<M.length;a++){var n=w.translation[M.charAt(a)];if(n&&n.recursive){e=!1;break}}e&&u.attr("maxlength",M.length).data("mask-maxlength",!0),b.destroyEvents(),b.events();t=b.getCaret();b.val(b.getMasked()),b.setCaret(t)}},w.init(!u.is("input"))}function a(){var t=o(this),a={},e="data-mask-",n=t.attr("data-mask");if(t.attr(e+"reverse")&&(a.reverse=!0),t.attr(e+"clearifnotmatch")&&(a.clearIfNotMatch=!0),"true"===t.attr(e+"selectonfocus")&&(a.selectOnFocus=!0),l(t,n,a))return t.data("mask",new i(this,n,a))}function l(t,a,e){e=e||{};var n=o(t).data("mask"),s=JSON.stringify,t=o(t).val()||o(t).text();try{return"function"==typeof a&&(a=a(t)),"object"!=typeof n||s(n.options)!==s(e)||n.mask!==a}catch(t){}}o.maskWatchers={};o.fn.mask=function(t,a){a=a||{};function e(){if(l(this,t,a))return o(this).data("mask",new i(this,t,a))}var n=this.selector,s=o.jMaskGlobals,r=s.watchInterval,s=a.watchInputs||s.watchInputs;return o(this).each(e),n&&""!==n&&s&&(clearInterval(o.maskWatchers[n]),o.maskWatchers[n]=setInterval(function(){o(document).find(n).each(e)},r)),this},o.fn.masked=function(t){return this.data("mask").getMaskedVal(t)},o.fn.unmask=function(){return clearInterval(o.maskWatchers[this.selector]),delete o.maskWatchers[this.selector],this.each(function(){var t=o(this).data("mask");t&&t.remove().removeData("mask")})},o.fn.cleanVal=function(){return this.data("mask").getCleanVal()},o.applyDataMask=function(t){((t=t||o.jMaskGlobals.maskElements)instanceof o?t:o(t)).filter(o.jMaskGlobals.dataMaskAttr).each(a)};var t,e,n={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&(n="input",e=document.createElement("div"),(t=(n="on"+n)in e)||(e.setAttribute(n,"return;"),t="function"==typeof e[n]),e=null,t),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};o.jMaskGlobals=o.jMaskGlobals||{},(n=o.jMaskGlobals=o.extend(!0,{},n,o.jMaskGlobals)).dataMask&&o.applyDataMask(),setInterval(function(){o.jMaskGlobals.watchDataMask&&o.applyDataMask()},n.watchInterval)},window.jQuery,window.Zepto);
$(".phone_input").mask("0000 000 000")

function request_call(me){
var error = 0;
var Call_First_Name = $("#Call_First_Name").val()
var Call_Phone_Number = $("#Call_Phone_Number").val()
var Call_Email_Address = $("#Call_Email_Address").val()

//Validate

if(Call_First_Name != ""){
$("#Call_First_Name").removeClass("border-danger");
} else {
$("#Call_First_Name").addClass("border-danger");
error ++
}

if(isPhone(Call_Phone_Number)){
$("#Call_Phone_Number").removeClass("border-danger");
} else {
$("#Call_Phone_Number").addClass("border-danger");
error ++
}

if(isEmail(Call_Email_Address)){
$("#Call_Email_Address").removeClass("border-danger");
} else {
$("#Call_Email_Address").addClass("border-danger");
error ++
}


if(error == 0){

$("#Call_First_Name").attr("disabled", true)
$("#Call_Phone_Number").attr("disabled", true)
$("#Call_Email_Address").attr("disabled", true)

$(me).html("<i class='fa-solid fa-circle-notch fa-spin mr-2'></i> Requesting Call")

// Web3Forms — free form-to-email. Get your key at https://web3forms.com (enter your email, key arrives by email).
var WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
$.ajax({
type: "POST",
url: "https://api.web3forms.com/submit",
dataType: "json",
data: {
  access_key: WEB3FORMS_ACCESS_KEY,
  subject: "New call request from mslending.au",
  from_name: "Money Sense Lending website",
  name: Call_First_Name,
  phone: Call_Phone_Number,
  email: Call_Email_Address
},
success: function(returnData){
  console.log(returnData)
  $(me).html("<i class='fa-regular fa-circle-check mr-2'></i> Call Requested")
},
error: function(){
  $("#Call_First_Name, #Call_Phone_Number, #Call_Email_Address").attr("disabled", false)
  $(me).html("Try again")
}
})

}
}
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


function isPhone(phone_number){
       var phoneExpression = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
       return phoneExpression.test(phone_number);
}

/* ---- Instant navigation: prefetch internal links on hover/touch ---- */
(function () {
  if (!('addEventListener' in window) || !document.head) return;
  var conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return; // respect data saver / slow links

  var prefetched = {};
  var timer;
  var canPrefetch = (function () {
    var l = document.createElement('link');
    return !!(l.relList && l.relList.supports && l.relList.supports('prefetch'));
  })();

  function prefetch(url) {
    if (prefetched[url]) return;
    prefetched[url] = true;
    if (canPrefetch) {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    } else {
      try { fetch(url, { credentials: 'same-origin' }); } catch (e) {}
    }
  }

  function eligible(a) {
    if (!a || !a.href) return false;
    if (a.origin !== location.origin) return false;       // same-site only
    if (a.hasAttribute('download')) return false;
    var raw = a.getAttribute('href') || '';
    if (raw.charAt(0) === '#') return false;               // in-page anchor
    if (a.href.split('#')[0] === location.href.split('#')[0]) return false; // current page
    if (a.hasAttribute('data-no-prefetch')) return false;
    return true;
  }

  document.addEventListener('mouseover', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!eligible(a)) return;
    clearTimeout(timer);
    timer = setTimeout(function () { prefetch(a.href); }, 65);
  }, { passive: true });

  document.addEventListener('mouseout', function () { clearTimeout(timer); }, { passive: true });

  document.addEventListener('touchstart', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (eligible(a)) prefetch(a.href);
  }, { passive: true });
})();

/* ---- Floating click-to-call button (mobile-first conversion) ---- */
(function () {
  function add() {
    if (document.getElementById('msl-call-fab')) return;
    var a = document.createElement('a');
    a.id = 'msl-call-fab';
    a.href = 'tel:1300442497';
    a.setAttribute('aria-label', 'Call Money Sense Lending on 1300 442 497');
    a.innerHTML = '<i class="fa-solid fa-phone"></i><span>Call 1300 442 497</span>';
    a.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:99999;background:#e25928;color:#fff;padding:13px 20px;border-radius:50px;font-weight:700;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.28);display:inline-flex;align-items:center;gap:9px;font-size:1rem;line-height:1';
    document.body.appendChild(a);
  }
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();
