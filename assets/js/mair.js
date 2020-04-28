function animations() {

}
animations.prototype={
    constructor:animations(),

    animeblock:function (nmrdublock) {
        anime({
            targets:document.getElementById('noeud'+(nmrdublock)),
            opacity:1,
            borderColor:[{value:'#2910ff',duration:3500},{
                value: '#000000'
            }],
            backgroundColor:[{value:'#6edbff',duration:3500},{
                value: '#ffffff'
            }],
        });
    },



    animeenrg:function(bloc,enrg,color){
        anime({
            targets:document.getElementById('bloc'+bloc+'enreg'+enrg),
            opacity:1,
            borderColor:[{value:color,duration:500},{
                value: '#000000'
            }]
        });
    },

    animetrouv:function (bloc,enrg,color) {
        anime({
            targets:document.getElementById('bloc'+bloc+'enreg'+enrg),

            borderColor:[{value:color,duration:1000},{
                value: '#000000'
            }],
            backgroundColor: [{value:color,duration:2000},{
                value: '#f2f8ff'}]
        });
    },

    animetrouv2:function (bloc,enrg,color) {
        anime({
            targets:document.getElementById('bloc'+bloc+'enreg'+enrg),

            borderRightColor:color

        });
    },

animeline:function (bloc) {
    anime({
        targets: document.getElementById('noeud' + bloc),
        opacity: 1,
        borderColor: [{value: "#06ff00", duration: 1000}, {
            value: '#000000'
        }],
        backgroundColor: [{value: "#06ff00", duration: 3000}, {
            value: '#000000'
        }]
    })
}



};





//===========================================================================================================




function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
}






//======================================================================================================================




class bloc{
    constructor(tabval){
        this.tabval=tabval;
        var tabfils=[];
        for(var i=0;i<this.tabval.length+1;i++){tabfils.push(-1);}
        this.tabfils=tabfils;
        this.degre=this.tabval.length+1;
    }

 async   recherecheInter(cle,bloc){
        var a=new animations();
        var inf=0;
        var sup=this.tabval.length-1;
        var trouv=false;
        var mil;
        while (trouv==false && inf<=sup){

            mil=Math.floor((inf+sup)/2);
            a.animeenrg(bloc,inf,"#ffda06");
            a.animeenrg(bloc,sup,"#ffda06");
            await sleep(400);
            if(this.tabval[mil]==cle){
                trouv=true;
                var tut=document.getElementById('bloc'+bloc+'enreg'+mil);
                if(tut!=null) {
                    tut.style.backgroundColor = "#06FF00";
                }
            }
            else {
                if(this.tabval[mil]<cle){
                    a.animeenrg(bloc,mil,"#ff5e56");
                    inf=mil+1;

                }
                else {
                    a.animeenrg(bloc,mil,"#ff5e56");
                    sup=mil-1;

                }
            }
            await sleep(900);
        }
        var resu=[trouv,mil];
        return resu;

    }




    insertioninter(cle,pos,bloc) {


        for (var i = this.tabval.length; i >pos; i--) {
            var elem=document.getElementById('bloc'+bloc+'enreg'+i);
            var elem2=document.getElementById('bloc'+bloc+'enreg'+(i-1));
            this.tabval[i]=this.tabval[i-1];
            elem.style.opacity=1;
            elem.style.height='20px';
            elem.style.width='20px';
            elem.style.top='-2px';
            elem.innerHTML=elem2.innerHTML;

        }
        this.tabval[pos] = cle;
        var elem3=document.getElementById('bloc'+bloc+'enreg'+pos);
        elem3.innerHTML='<p>'+cle+'</p>';
        elem3.style.opacity=1;
        elem3.style.height='20px';
        elem3.style.width='20px';
        elem3.style.top='-2px';



    }

    nbfilsvid(h){
        var nb=0;
        for(var i=0;i<h;i++){
            if(this.tabfils[i]==-1){
                nb++
            }
        }
        return nb;
    }


}


//===========================================================================================================
//===========================================================================================================



class fichier {
    constructor(tabbloc,root){
        this.tabbloc=tabbloc;
        this.root=root;
    }
    adrroot(){
       return  this.tabbloc.indexOf(this.root);
    }



  async   suppressionintern(bloc,enrg){
        for(var i=enrg;i<this.tabbloc[bloc].tabval.length;i++){
            var elem=document.getElementById('bloc'+bloc+'enreg'+i);
            var elem2=document.getElementById('bloc'+bloc+'enreg'+(i+1));
            if(elem2!=null) {
                elem.innerHTML = elem2.innerHTML
            }
            await sleep(400);
        }
        var elem9=document.getElementById('bloc'+bloc+'enreg'+(this.tabbloc[bloc].tabval.length-1));
        elem9.innerHTML='';
        elem9.style.width='0px';       // decalage dakhal el noeud obligi machi thabat opacity aljdmlha function
        elem9.style.height='0px';
        elem9.style.opacity=0;

    }


    descendantde(pere,fils){
        var i=0;
        var trouv=false;
        while (i<pere.tabval.length && trouv==false){
            if(fils.tabval[fils.tabval.length-1]<pere.tabval[i]){
                trouv=true;
            }else {
                i++;
            }


        }
        pere.tabfils[i]=this.tabbloc.indexOf(fils);
    }




    allocbloc(){
        var noeud=new bloc([]);
        this.tabbloc.push(noeud);
        let divblock=document.createElement('div');
        divblock.id='bloc'+this.tabbloc.indexOf(noeud);
        divblock.className='bloc';
        for(var j=0;j<4;j++){
            let divenrg=document.createElement('div');
            divenrg.className='Tenreg';
            divenrg.id='bloc'+this.tabbloc.indexOf(noeud)+'enreg'+j;
            divblock.appendChild(divenrg);
        }
        let nd=document.createElement('span');
        nd.className='tf-nc';
        nd.id='noeud'+this.tabbloc.indexOf(noeud);
        nd.appendChild(divblock);
        return([nd,this.tabbloc.indexOf(noeud)]);
    }


    creatdivenreg(bloc,enreg){
        let divenrg=document.createElement('div');
        divenrg.className='Tenreg';
        divenrg.id='bloc'+bloc+'enreg'+enreg;
        divenrg.innerHTML='<p>'+fich.tabbloc[bloc].tabval[enreg]+'</p>';
        return divenrg
    }



//===========================================================================================================
//===========================================================================================================



    async  recherche(cle) {

        var enregs=document.getElementsByClassName('Tenreg');
        for(var f=0;f<enregs.length;f++){
            enregs[f].style.borderColor="#000";
            enregs[f].style.backgroundColor="inherit";

        }
        var i=this.adrroot();
         var  a= new animations();
        var prec=-1;
        var j=0;
        var trouv=false;
        while (trouv==false && i!=-1 && this.tabbloc[i]!=undefined){

                j = 0;
                a.animeblock(i);
               var p= await this.tabbloc[i].recherecheInter(cle,i);
                trouv=p[0];


                if (trouv == false) {
                    var stop=false;

                    while (j<this.tabbloc[i].tabval.length && stop==false){

                        if(this.tabbloc[i].tabval[j]>cle){
                            stop=true;

                        }else{
                            j++;
                        }
                    }
                    prec = i;
                    if(j<this.tabbloc[i].tabval.length){
                       a.animetrouv2(i,j-1,"#ff0500")
                    }else {
                        a.animetrouv2(i,j-1,"#ff0500");
                    }
                    i = this.tabbloc[i].tabfils[j];
                    a.animeblock(i);
                    await sleep(200);
                }
            }
            if(trouv==true){
                j= (await this.tabbloc[i].recherecheInter(cle))[1];
            }


        return [trouv,prec,i,j];


    }



    async  recherche2(cle) {
        var algo=document.getElementById("information2");
        algo.innerHTML='<p id="titre"> &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp&nbsp  &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp Recherche</p>';
        var enregs=document.getElementsByClassName('Tenreg');
        for(var f=0;f<enregs.length;f++){
            enregs[f].style.borderColor="#000";
            enregs[f].style.backgroundColor="inherit";

        }
        var i=this.adrroot();
        var  a= new animations();
        var prec=-1;
        var j=0;
        var trouv=false;
        while (trouv==false && i!=-1 && this.tabbloc[i]!=undefined){

            j = 0;
             (algo.innerHTML+='<p>recherche interne de  '+cle+' dans le noeud d\'addres '+i+'</p>');
            a.animeblock(i);

            var p= await this.tabbloc[i].recherecheInter(cle,i);

            trouv=p[0];


            if (trouv == false) {
                algo.innerHTML+='<p> '+cle+' n\'exist pas dans le noeud d\'address '+i+'</p>';


                var stop=false;

                while (j<this.tabbloc[i].tabval.length && stop==false){

                    if(this.tabbloc[i].tabval[j]>cle){
                        stop=true;

                    }else{
                        j++;
                    }
                }
                prec = i;
                if(j<this.tabbloc[i].tabval.length){
                    a.animetrouv2(i,j-1,"#ff0500")
                }else {
                    a.animetrouv2(i,j-1,"#ff0500");
                }
                algo.innerHTML+='<p>'+j+' est la position où '+cle+' doit etre inserée dans le noeud '+i+'</p>';
                await sleep(500);
                algo.innerHTML+='<p> on passe a Fils['+j+'] du noeud '+i+'</p>';

                i = this.tabbloc[i].tabfils[j];
                a.animeblock(i);
                await sleep(1000);
            }
        }
        if(trouv==true){
            j= (await this.tabbloc[i].recherecheInter(cle))[1];
            algo.innerHTML+='<p id="conc">&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp&nbsp  &nbsp &nbsp  &nbsp &nbsp &nbsp '+cle+' existe dans le noeud '+i+' pointé par '+prec+'</p>';
        }
        else {
            algo.innerHTML+='<p id="conc2">&nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp&nbsp  &nbsp &nbsp  '+cle+' n\'existe pas </p>';
        }


        return [trouv,prec,i,j];


    }



//===========================================================================================================
//===========================================================================================================



    async   insertion(cle){
        var algo=document.getElementById("information2");
        algo.innerHTML='<p id="titre"> &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp&nbsp  &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp Insertion</p>';
        await sleep(500);
        algo.innerHTML+='<p>recherche('+cle+')</p>';
        var r=await this.recherche(cle);
            if(r[0]==false){
                algo.innerHTML+='<p>localiser le noeud: '+r[1]+ ' où '+cle+' doit être insérée </p>';
                await sleep(500);
                if(this.tabbloc[r[1]].tabval.length<4){
                    algo.innerHTML+='<p>insertion dans le noeud s\'il n\'est pas plein';
                    await sleep(500);
                    this.tabbloc[r[1]].insertioninter(cle,r[3],r[1]);
                    this.tabbloc[r[1]].tabfils.push(-1);
                    this.tabbloc[r[1]].degre=this.tabbloc[r[1]].tabval.length+1;


                }
                else {
                    algo.innerHTML+='<p>allocation d\'nouveau noeud si le noeud '+r[1]+' est plein</p>';
                    await sleep(500);
                    var i=this.allocbloc();
                    this.tabbloc[i[1]].tabval.push(cle);
                    algo.innerHTML+='<p>insertion de '+cle+'dans le nouveau noeud '+i[1]+'</p>';
                    await sleep(500);
                    this.tabbloc[i[1]].tabfils.push(-1);
                    this.tabbloc[i[1]].degre=this.tabbloc[i[1]].tabval.length+1;
                    this.tabbloc[r[1]].tabfils[r[3]]=i[1];
                    algo.innerHTML+='<p>on fait pointer le nouveau noeud '+i[1]+' par le Fils '+r[3]+' de noeud '+r[1]+'</p>';
                    await sleep(500);
                    var simpos=r[3]-this.tabbloc[r[1]].nbfilsvid(r[3]);
                    var pere=document.getElementById("ele"+r[1]);
                    if(pere.childNodes[1]!=undefined){
                        var u=document.createElement('li');
                        u.id='ele'+i[1];
                        u.appendChild(i[0]);
                        var len=pere.childNodes[1].childNodes.length;
                           var arr=Array.from(pere.childNodes[1].childNodes);
                           for(var n=0;n<pere.childNodes[1].childNodes.length;n++){
                               pere.childNodes[1].childNodes[n].parentNode.removeChild( pere.childNodes[1].childNodes[n]);
                           }
                           arr.splice(simpos,0,u);
                        for(var v=0;v<arr.length;v++){
                            pere.childNodes[1].appendChild(arr[v]);
                        }
                    }
                    else {
                        var o=document.createElement('ul');
                        var u=document.createElement('li');
                        u.id='ele'+i[1];
                        u.appendChild(i[0]);
                        o.appendChild(u);
                        pere.appendChild(o);
                    }
                    var t=document.getElementById('bloc'+i[1]+'enreg'+0);
                    t.innerHTML='<p>'+cle+'</p>';
                    t.style.opacity=1;
                    t.style.height='20px';
                    t.style.width='20px';
                    t.style.top='-2px';



                }
            }


    }



//===========================================================================================================
//===========================================================================================================




    async supprimer(cle){
        var r=  await this.recherche(cle);
        var a=new animations();
        var trouv=r[0];
        var pere=r[1];
        var noeud=r[2];
        var loc=r[3];
        if(trouv==true){
            if(this.tabbloc[noeud].tabfils[loc+1]==-1){
              await   this.suppressionintern(noeud,loc);
               this.tabbloc[noeud].tabval.splice(loc,1);
                this.tabbloc[noeud].tabfils.splice(loc,1);
                this.tabbloc[noeud].degre=this.tabbloc[noeud].tabval.length+1;
                if(this.tabbloc[noeud].tabval.length==0){
                    var x=this.tabbloc[pere].tabfils.indexOf(noeud);
                    this.tabbloc[pere].tabfils[x]=-1;
                    var noeudsup=document.getElementById('ele'+noeud);
                    noeudsup.parentNode.removeChild(noeudsup);
                }
                this.tabbloc[noeud].degre=this.tabbloc[noeud].tabval.length+1;

            }
            else {
                this.tabbloc[noeud].tabval[loc]=this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval[0];
                var elem8=document.getElementById('bloc'+noeud+'enreg'+loc);
                var elem9=document.getElementById('bloc'+this.tabbloc[noeud].tabfils[loc+1]+'enreg'+0);
                elem8.innerHTML=elem9.innerHTML;
               await this.suppressionintern(this.tabbloc[noeud].tabfils[loc+1],0);
                var noeudsup=document.getElementById('ele'+this.tabbloc[noeud].tabfils[loc+1]);


                if(this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]==-1) {
                    this.tabbloc[this.tabbloc[noeud].tabfils[loc + 1]].tabfils.splice(0, 1);
                }
                else {
                    this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval[0]=this.tabbloc[this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]].tabval[0];
                    var elem8=document.getElementById('bloc'+this.tabbloc[noeud].tabfils[loc+1]+'enreg'+0);
                    var elem9=document.getElementById('bloc'+this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]+'enreg'+0);
                    elem8.innerHTML=elem9.innerHTML;
                  await  this.suppressionintern(this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0],0);
                    var noeudsup=document.getElementById('ele'+this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabfils[0]);
                    this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.splice(0,1);
                }

                this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.splice(0,1);


                this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].degre=this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.length+1;
                if(   this.tabbloc[this.tabbloc[noeud].tabfils[loc+1]].tabval.length==0){
                    this.tabbloc[noeud].tabfils[loc+1]=-1

                    noeudsup.parentNode.removeChild(noeudsup);
                   // this.tabbloc.splice(this.tabbloc[noeud].tabfils[loc+1],1);
                }



            }

        }


    }





}

var a=[24,40,67,82];
var b=[2,5,12,20];
var c=[27,30];
var d=[42,50,55,60];
var e=[71,80];
var f=[90,95,97,99];
var g=[10];
var h=[47,48];
var i=[63,65,66];

var g5=new bloc(g);
var h5=new bloc(h);
var i5=new bloc(i);
var b2= new bloc(b);
var c3= new bloc (c);
var d4 = new bloc(d);
var e5 =new bloc(e);
var f5=new bloc(f);
var a1 = new bloc(a);
var  tab=[g5,h5,i5,b2,c3,d4,e5,f5,a1];

var fich=new fichier(tab,a1);
fich.descendantde(a1,b2);
fich.descendantde(a1,c3);
fich.descendantde(a1,d4);
fich.descendantde(a1,e5);
fich.descendantde(a1,f5);
fich.descendantde(b2,g5);
fich.descendantde(d4,h5);
fich.descendantde(d4,i5);

var elem=document.getElementById("mair");
var ma='<span class="tf-nc" id="noeud8" >'+'</span>';
var mb='<span class="tf-nc" id="noeud3" >'+'</span>';
var mc='<span class="tf-nc" id="noeud4" >'+'</span>';
var md='<span class="tf-nc" id="noeud5" >'+'</span>';
var me='<span class="tf-nc" id="noeud6" >'+'</span>';
var mf='<span class="tf-nc" id="noeud7" >'+'</span>';
var mg='<span class="tf-nc" id="noeud0" >'+'</span>';
var mh='<span class="tf-nc" id="noeud1" >'+'</span>';
var mi='<span class="tf-nc" id="noeud2" >'+'</span>';
elem.innerHTML='<ul><li id="ele8">'+ma+'<ul><li id="ele3">'+mb+'<ul ><li id="ele0">'+mg+'</li></ul></li><li id="ele4">'+mc+'</li><li id="ele5">'+md+'<ul><li id="ele1">'+mh+'</li><li id="ele2">'+mi+'</li></ul></li><li id="ele6">'+me+'</li><li id="ele7">'+mf+'</li></li></ul>';

for(var i=0;i<fich.tabbloc.length;i++){
    let divblock=document.createElement('div');
    divblock.id='bloc'+i;
    divblock.className='bloc';
    for(var j=0;j<4;j++){
       let divenrg=document.createElement('div');
       divenrg.className='Tenreg';
       divenrg.id='bloc'+i+'enreg'+j;
       divblock.appendChild(divenrg);
    }

    var z=document.getElementById("noeud"+i);
    z.appendChild(divblock);

    for(var j=0;j<fich.tabbloc[i].tabval.length;j++){
        var x=document.getElementById('bloc'+i+'enreg'+j);
        x.innerHTML='<p>'+fich.tabbloc[i].tabval[j]+'</p>';
        x.style.opacity=1;
        x.style.height='20px';
        x.style.width='20px';
        x.style.top='-2px';

    }
}

function insere() {

    let s=prompt("Veuillez tapez le clé a inserer:");
    fich.insertion(s);



}
function rech() {
        let a=prompt('Veuillez tapez la cle a rechercher:');
        fich.recherche2(a);


}
function supp() {
        let s=prompt("Veuillez tapez l'enregitrement a supprimer:");

        fich.supprimer(s);



}

document.getElementById('inserer').onclick=insere;
document.getElementById('rechercher').onclick=rech;
document.getElementById('supprimer').onclick=supp;

