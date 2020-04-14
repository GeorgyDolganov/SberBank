
window.onload = function() {
    const app = new App();
    app.Start();
}

window.onclick = function(event) {
    if (!event.target.matches('.dropBtn')) {
        var dropdowns = document.getElementsByClassName("dropMenu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('d-flex')) {
                openDropdown.classList.remove('d-flex');
            }
        }
    }
}


const headerSpaceTarget = document.getElementById("headerSpace"),
    profileToggle = document.getElementById("profileToggle"),
    profileMenu = document.getElementById("profileMenu"),
    logoLabel = document.getElementById("logoLabel"),
    moreBtn = document.getElementById("moreBtn"),
    moreMenu = document.getElementById("moreMenu"),
    headerNav = document.getElementById("headerNav"),
    hamburger = document.getElementById("hamburger"),
    laptopMore = document.getElementsByClassName("laptopMore"),
    pagesHandler = {
        apply: function(target, thisArg, argumentsList) {
            return thisArg[target].apply(this, argumentList);
        },
        set:function(target,property,value,receiver) {
            target[property] = value;
            if (property!="length"){
                selectedLink = document.getElementById('link-' + property);
                selectedLink.classList.toggle('d-none');
            };
            return true;
        },
        deleteProperty: function(target, property) {
            selectedLink = document.getElementById('link-' + property);
            selectedLink.classList.toggle('d-none');
            return true;
        },
    },
    pagesInMoreHandler = {
        apply: function(target, thisArg, argumentsList) {
            return thisArg[target].apply(this, argumentList);
        },
        set:function(target,property,value,receiver) {
            target[property] = value;
            if (property!="length"){
                selectedLink = document.getElementById('linkInMore-' + property);
                 selectedLink.classList.toggle('d-none');
            };
            return true;
        },
        deleteProperty: function(target, property) {
            selectedLink = document.getElementById('linkInMore-' + property);
            selectedLink.classList.toggle('d-none');
            return true;
        },
    };
    
      
let state = {
        x1: false,
        x2: false,
        x3: false,
        x4: false,
        x5: false,
    },
    headerSpaceData = {
        x1: 0,
        x2: 0,
        x3: 0,
        x4: 0,
        x5: 0
    },
    pages = [
        'task',
        'calendar',
        'staff',
        'replacement',
        'link',   
        'education',
        'game',
        'feedback',
        'checks',
    ],
    pagesInMore = [],
    travelingPage = null,
    pagesProxy = new Proxy(pages,pagesHandler); 
    pagesInMoreProxy = new Proxy (pagesInMore, pagesInMoreHandler);


toggleModal = (modalId) => {
    if (state.x2 || state.x3 || state.x4 || state.x5) {
        let modal = document.getElementById(modalId);
        if (modal.classList.contains('d-flex')){
            // for (opacity = 1; opacity > 0.1; opacity = opacity - 0.1) 
            // {           
            //     setTimeout(()=>{profileBar.style.opacity = opacity;},1000)                       
            // } 
            modal.classList.toggle('d-flex');
            
        }else {
            modal.classList.toggle('d-flex');
            // for (opacity = 0; opacity < 0.9; opacity = opacity + 0.1) 
            // {           
            //     setTimeout(()=>{profileBar.style.opacity = opacity;},100)                       
            // }  
        }
    };
}

class App{
    constructor(){

    }

    Start(){
        state.x1 = true;
        this.createHeader();
        this.checkHeaderState();
    }

    createHeader(){
        pages.forEach((item, index) => {
            let label = item.charAt(0).toUpperCase() + item.substring(1);
            moreBtn.insertAdjacentHTML("beforebegin", `
            <div class="link" onclick="" id="link-${index}">
                <i class="icon icon_${item}"></i>
                <label>${label}</label>
            </div>
            `);
            
        });
        pages.slice().reverse().forEach((item,index) => {
            let label = item.charAt(0).toUpperCase() + item.substring(1);
            moreMenu.insertAdjacentHTML("afterbegin", `
            <div class="link d-none" onclick="" id="linkInMore-${index}">
                <i class="icon icon_${item}"></i>
                <label>${label}</label>
            </div>
            `);
        });
    }

    checkHeaderState(){
        setInterval(()=>{
            if (state.x1){
                x1();
            }else if(state.x2){
                x2();
            } else if (state.x3){
                x3();
            } else if (state.x4){
                x4();
            } else if (state.x5){
                x5();
            } else{
                console.error("No state passed");
            }
        }, 10);

    };
};

x1 = () => {
    currentSpace = headerSpaceTarget.getBoundingClientRect();
    headerSpaceData.x1 = currentSpace.width;
    if (headerSpaceData.x1 <= 32){
        profileToggle.classList.remove('d-none');
        profileToggle.classList.add('d-flex');
        profileMenu.classList.remove('profile-desktop');
        profileMenu.classList.add('profile-mobile');
        state.x1 = false;
        console.log("x1: "+ state.x1);
        state.x2 = true;
    };
};

x2 = () => {
    currentSpace = headerSpace.getBoundingClientRect();
    headerSpace.x2 = currentSpace.width;
    if (headerSpace.x2 <= 32){
        console.log("x2: "+ state.x2);
        logoLabel.classList.toggle("d-none");
        state.x2 = false;
        state.x3 = true;
    } else if (headerSpace.x2 >= 250){
        
        profileMenu.style.opacity = 1;
        profileToggle.classList.toggle('d-flex');
        profileMenu.classList.add('profile-desktop');
        profileMenu.classList.remove('profile-mobile');
        if (!profileMenu.classList.contains('d-flex')){
            profileMenu.classList.contains('d-flex')
        }
        state.x1 = true;
        console.log("x1: "+ state.x1);
        state.x2 = false;
    }
}

x3 = () => {
    currentSpace = headerSpace.getBoundingClientRect();
    headerSpace.x3 = currentSpace.width;
    if (headerSpace.x3 <= 32){
        moreBtn.classList.toggle("d-none");
        console.log("x4: "+ state.x4);
        state.x3 = false;
        state.x4 = true;
    }
    if (headerSpace.x3 >= 180){
        state.x3 = false;
        profileMenu.style.opacity = 1;
        logoLabel.classList.toggle("d-none");
        state.x2 = true;
        console.log("x2: "+ state.x2);
    }
}

x4 = () => {
    currentSpace = headerSpace.getBoundingClientRect();
    headerSpace.x4 = currentSpace.width;
    if (pages.length > 4){
        
        if (headerSpace.x4 <= 16){
            travelingPage = pagesProxy.splice(-1)[0];    
            pagesInMoreProxy.push(travelingPage);
        };
        if (pages.length <= 8){
            if (headerSpace.x4 >= 120){
                travelingPage = pagesInMoreProxy.splice(-1)[0];    
                pagesProxy.push(travelingPage);
            }
        }
        
    }else{
        if (headerSpace.x4 <= 16){
            console.log("x4: "+ state.x4);
            state.x4 = false;
            for (i=-1; i < pages.length; i++) {
                travelingPage = pagesProxy.splice(-1)[0];    
                pagesInMoreProxy.push(travelingPage);
            }
            for (i = 0; i < laptopMore.length; i++){
                var item = laptopMore[i];
                item.classList.toggle('d-none')
            }
            hamburger.classList.toggle('d-none')
            state.x5 = true;
            console.log("x4: "+ state.x4);
        }
    };

    
    if (headerSpace.x4 >= 180){
        profileMenu.style.opacity = 1;
        moreBtn.classList.toggle("d-none");
        state.x3 = true;
        console.log("x3: "+ state.x3);
        state.x4 = false;
    }
};

x5 = () => {
    currentSpace = headerSpace.getBoundingClientRect();
    headerSpace.x5 = currentSpace.width;

    if (headerSpace.x5 >= 380 && pages.length <= 4){
        travelingPage = pagesInMoreProxy.splice(-1)[0];    
        pagesProxy.push(travelingPage);
    }
    if (headerSpace.x5 >= 420){
        state.x5 = false;
        for (i=-1; i < pages.length; i++) {
            travelingPage = pagesProxy.splice(-1)[0];    
            pagesInMoreProxy.push(travelingPage);
        }
        for (i = 0; i < laptopMore.length; i++){
            var item = laptopMore[i];
            item.classList.toggle('d-none')
        }
        hamburger.classList.toggle('d-none')
        state.x4 = true;
        console.log("x5: "+ state.x5);
    }
}
