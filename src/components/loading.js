const animation = {}
var loading_bubble = '<div class="spinner-box">'
    +'<div class="pulse-container">'  
    +'<div class="pulse-bubble pulse-bubble-1"></div>'
    +'<div class="pulse-bubble pulse-bubble-2"></div>'
    +'<div class="pulse-bubble pulse-bubble-3"></div>'
    +'</div>'
    +'</div>'

var loading_circle = '<div class="spinner-box">\
                          <div class="circle-border">\
                          <div class="circle-core"></div>\
                       </div></div>'

var loading_border = '<div class="spinner-box">\
                          <div class="configure-border-1">  \
                              <div class="configure-core"></div>\
                          </div>  \
                          <div class="configure-border-2">\
                              <div class="configure-core"></div>\
                          </div> \
                      </div>'

var loading_solar = '<div class="spinner-box">\
                         <div class="solar-system">\
                             <div class="earth-orbit orbit">\
                                 <div class="planet earth"></div>\
                             <div class="venus-orbit orbit">\
                                 <div class="planet venus"></div>\
                             <div class="mercury-orbit orbit">\
                                     <div class="planet mercury"></div>\
                                     <div class="sun"></div>\
                                     </div>\
                                 </div>\
                             </div>\
                         </div>\
                    </div>'

animation['loading_buble'] = loading_bubble
animation['loading_circle'] = loading_circle
animation['loading_solar'] = loading_solar
animation['loading_border'] = loading_border
export default animation