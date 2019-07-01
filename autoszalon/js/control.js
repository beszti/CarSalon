var navbar = new Vue({
	el:"#navbar",
	data:{
        vis: false,
        user: "Anonymus"
    },
    methods:{
        show: function() {
            this.vis = true
        },
        hide: function() {
            this.vis = false
        },
        setUser: function(data){
             this.user = data;
        },
        logout: function(){
            $("#navbar").slideUp(50, function(){
                navbar.hide();
                screen.hide();
            });
            $("#leftSideMenu").slideUp(10, function(){
                menu.hide();
            })
            $("#login").slideDown(2000, function(){
                login.show();
            });
        }
    }
})

var login = new Vue({
    el:"#login",
    data:{
        vis: true
    },
    methods: {
        show: function() {
            this.vis = true
        },
        hide: function() {
            this.vis = false
        },
        login: function(){
            var user_name = $('#logName').val();
            var user_pw = $('#logPw').val();
            $.ajax({
                type:"POST",
                url:'php/getUser.php',
                dataType: "json",
                data:{user_name:user_name, user_pw:user_pw},
                success: function(data){
                    if(data.status == 'ok'){
                        navbar.setUser(data.result.fullname);
                        console.log(data);
                        $("#login").slideUp(2000, function(){
                            login.hide();                            
                            $("#navbar").slideDown(2000, function(){
                                navbar.show();
                            });
                            $("#leftSideMenu").slideDown(2000, function(){
                                menu.show();
                            })
                        });
                    }
                }
            });
        }
    }
})

var menu = new Vue({
    el:"#leftSideMenu",
    data:{
        vis: false,
        menuItems: [
            {id:"cars", value :"Autók"},
            {id:"employees", value: "Alkalmazottak"},
            {id:"buyers", value: "Vevők"}
        ]
    },
    methods: {
        show: function() {
            this.vis = true
        },
        hide: function() {
            this.vis = false
        },
        getDatas: function(table_name){
            console.log(table_name+"");
            $.ajax({
                type:"POST",
                url:'php/getDatas.php',
                dataType: "json",
                data:{table_name:table_name, txt:""},
                success: function(data){
                    if(data.status == 'ok'){
                        console.log(data);
                        if(table_name == "cars"){
                            screenB.hide();
                            screenE.hide();
                            screenC.show();
                            screenC.setTableDatas(data);
                        }
                        if(table_name == "employees"){
                            screenB.hide();
                            screenC.hide();
                            screenE.show();
                            screenE.setTableDatas(data);
                        }
                        if(table_name == "buyers"){
                            screenC.hide();
                            screenE.hide();
                            screenB.show();
                            screenB.setTableDatas(data);
                        }
                    }
                }
            });
        }
    }
})

var screenC = new Vue({
    el:"#mainScreenC",
    data:{
        vis: false,
        carsItems: ["id", "band", "color", "employeeID", "price"],
        tableDatas: []
    },
    methods: {
        show: function() {
            this.vis = true
        },
        hide: function() {
            this.vis = false
        },
        setTableDatas: function(data){
            this.tableDatas = data;
        },
        Search: function(table_name, column, input){
            var txt = " WHERE "+column+" LIKE '%" + $(input).val() + "%'";
                $.ajax({
                    url:"php/getDatas.php",
                    method:"POST",
                    dataType: "json",
                    data:{table_name:table_name, txt:txt},
                    success: function(data){
                        if(data.status == 'ok'){
                            console.log(table_name+""+txt+"");
                            console.log(data);
                            screenC.setTableDatas(data);
                        }
                    }
                });
        }
    }
})

var screenE = new Vue({
    el:"#mainScreenE",
    data:{
        vis: false,
        emplItems: ["idE", "name", "phone", "address"],
        tableDatas: []
    },
    methods: {
        show: function() {
            this.vis = true
        },
        hide: function() {
            this.vis = false
        },
        setTableDatas: function(data){
            this.tableDatas = data;
        },
        Search: function(table_name, column, input){
            var txt = " WHERE "+column+" LIKE '%" + $(input).val() + "%'";
                $.ajax({
                    url:"php/getDatas.php",
                    method:"POST",
                    dataType: "json",
                    data:{table_name:table_name, txt:txt},
                    success: function(data){
                        if(data.status == 'ok'){
                            console.log(table_name+""+txt+"");
                            console.log(data);
                            screenE.setTableDatas(data);
                        }
                    }
                });
        }
    }
})

var screenB = new Vue({
    el:"#mainScreenB",
    data:{
        vis: false,
        buyersItems: ["idB", "nameB", "phoneB", "addressB"],
        tableDatas: []
    },
    methods: {
        show: function() {
            this.vis = true
        },
        hide: function() {
            this.vis = false
        },
        setTableDatas: function(data){
            this.tableDatas = data;
        },
        Search: function(table_name, column, input){
            var txt = " WHERE "+column+" LIKE '%" + $(input).val() + "%'";
                $.ajax({
                    url:"php/getDatas.php",
                    method:"POST",
                    dataType: "json",
                    data:{table_name:table_name, txt:txt},
                    success: function(data){
                        if(data.status == 'ok'){
                            console.log(table_name+""+txt+"");
                            console.log(data);
                            screenB.setTableDatas(data);
                        }
                    }
                });
        }
    }
})

$("#id").keyup(function(){
    screenC.Search("cars", "id", "#id");
});
$("#band").keyup(function(){    
    screenC.Search("cars", "band", "#band");
});
$("#employeeID").keyup(function(){    
    screenC.Search("cars", "employeeID", "#employeeID");
});
$("#color").keyup(function(){
    screenC.Search("cars", "color", "#color");
});
$("#price").keyup(function(){
    screenC.Search("cars", "price", "#price");
});
$("#idE").keyup(function(){
    screenE.Search("employees", "id", "#idE");
});
$("#name").keyup(function(){
    screenE.Search("employees", "name", "#name");
});
$("#phone").keyup(function(){
    screenE.Search("employees", "phone", "#phone");
});
$("#address").keyup(function(){
    screenE.Search("employees", "address", "#address");
});
$("#idB").keyup(function(){
    screenB.Search("buyers", "id", "#idB");
});
$("#nameB").keyup(function(){
    screenB.Search("buyers", "name", "#nameB");
});
$("#phoneB").keyup(function(){
    screenB.Search("buyers", "phoneB", "#phoneB");
});
$("#addressB").keyup(function(){
    screenB.rSearch("buyers", "address", "#addressB");
})
