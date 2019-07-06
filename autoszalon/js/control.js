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

            let formData = new FormData();
            formData.append('user_name',user_name)
            formData.append('user_pw', user_pw)

            axios({
                method: 'post',
                url: 'php/getUser.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(resp){
                if(resp.data.status == 'ok'){
                    navbar.setUser(resp.data.result.fullname);
                    console.log(resp.data);
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
            }).catch(function(error){
                console.log(error+"");
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
        getDatas: function(table_name, txt){
            console.log(table_name+"");
            let formData = new FormData();
            formData.append('table_name',table_name)
            formData.append('txt', txt)
            axios({
                method: 'post',
                url: 'php/getDatas.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(resp){
                if(resp.data.status == 'ok'){
                    console.log(resp.data);
                    if(table_name == "cars"){
                        update.hide();
                        update2.hide();
                        update3.hide();
                        screenB.hide();
                        screenE.hide();
                        screenC.show();
                        screenC.setTableDatas(resp.data);
                    }
                    if(table_name == "employees"){
                        update.hide();
                        update2.hide();
                        update3.hide();
                        screenB.hide();
                        screenC.hide();
                        screenE.show();
                        screenE.setTableDatas(resp.data);
                    }
                    if(table_name == "buyers"){
                        update.hide();
                        update2.hide();
                        update3.hide();
                        screenC.hide();
                        screenE.hide();
                        screenB.show();
                        screenB.setTableDatas(resp.data);
                    }
                }
            }).catch(function(error){
                console.log(error+"");
            });
        }
    }
})

var screenC = new Vue({
    el:"#mainScreenC",
    data:{
        vis: false,
        items: ["id", "band", "color", "employeeID", "price"],
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
            this.tableDatas = data
        },
        search: function(table_name, column, input){
            var txt = " WHERE "+column+" LIKE '%" + $(input).val() + "%'";
            menu.getDatas(table_name, txt)
        },
        update: function(id){
            update.show()
            update.copyForUpdate(id, "cars")
        },
        insert: function(){
            let formData = new FormData()
            for (let index = 0; index < this.items.length; index++) {
                var item = this.items[index];
                formData.append(item, $("#"+item).val())
            }
                        
            axios({
                method: 'post',
                url: 'php/addCars.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(){
                update.hide()
                menu.getDatas("cars","")
            }).catch(function(error){
                console.log(error+"");
            });
        }
    }
})

var screenE = new Vue({
    el:"#mainScreenE",
    data:{
        vis: false,
        items: ["idE", "name", "phone", "address"],
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
        search: function(table_name, column, input){
            var txt = " WHERE "+column+" LIKE '%" + $(input).val() + "%'";
            menu.getDatas(table_name, txt)
        },
        update: function(id){
            update3.copyForUpdate(id, "employees")
            update3.show()
        },
        insert: function(){
            let formData = new FormData()
            for (let index = 0; index < this.items.length; index++) {
                var item = this.items[index];
                formData.append(item, $("#"+item).val())
            }
                        
            axios({
                method: 'post',
                url: 'php/addEmployees.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(){
                update3.hide()
                menu.getDatas("employees","")
            }).catch(function(error){
                console.log(error+"");
            });
        }
    }
})

var screenB = new Vue({
    el:"#mainScreenB",
    data:{
        vis: false,
        items: ["idB", "nameB", "phoneB", "addressB"],
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
        search: function(table_name, column, input){
            var txt = " WHERE "+column+" LIKE '%" + $(input).val() + "%'";
            menu.getDatas(table_name, txt)
        },
        update: function(id){
            update2.copyForUpdate(id, "buyers")
            update2.show()
        },
        insert: function(){
            let formData = new FormData()
            for (let index = 0; index < this.items.length; index++) {
                var item = this.items[index];
                formData.append(item, $("#"+item).val())
            }
                        
            axios({
                method: 'post',
                url: 'php/addBuyers.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(){
                update2.hide()
                menu.getDatas("buyers","")
            }).catch(function(error){
                console.log(error+"");
            });
        }    
    }
})

var update = new Vue({
    el:"#updateForm",
    data:{
        vis: false,
        carItems: ["idU", "bandU", "colorU", "employeeIDU", "priceU"],
        carColumns: ["id", "band", "color", "employeeID", "price"]
    },
    methods:{
        show: function(){
            this.vis = true
        },
        hide: function(){
            this.vis = false
        },
        copyForUpdate: function(id, screen){
            for (let index = 0; index < screenC.items.length; index++) {
                var idText = screenC.items[index]
               console.log(id+" "+idText+" "+screenC.tableDatas[id][idText])
               $("#"+this.carItems[index]).val(screenC.tableDatas[id][idText]+"")
            }
        },
        update: function(){
            table_name = "cars"
            let formData = new FormData();
            formData.append("table_name", table_name)
                    
                var txt = ""
                for (let index = 0; index < this.carItems.length; index++) {
                    if(index > 0){
                        txt+=","
                    }
                    var idText = this.carItems[index]
                    var columnName = this.carColumns[index]
                    if(index < 3){
                        txt+= " "+columnName+" = '"+$("#"+idText).val()+"'"
                    }
                    if(index > 2){
                        txt+= " "+columnName+" = "+$("#"+idText).val()
                    }
                }
                txt+= " WHERE id = "+$("#idU").val()
                formData.append("txt", txt)
            
            axios({
                method: 'post',
                url: 'php/update.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(){
                update.hide()
                menu.getDatas(table_name,"")
            }).catch(function(error){
                console.log(error+"");
            });
        }
    }
})

var update2 = new Vue({
    el:"#updateForm2",
    data:{
        vis: false,
        humanItems: ["id2U", "nameU", "phoneU", "addressU"],
        humanColumns: ["id", "name", "phone", "address"]
    },
    methods:{
        show: function(){
            this.vis = true
        },
        hide: function(){
            this.vis = false
        },
        copyForUpdate: function(id, screen){
            for (let index = 0; index < this.humanColumns.length; index++) {
                var idText = this.humanColumns[index]
                console.log(id+" "+idText+" "+screenB.tableDatas[id][idText])
                $("#"+this.humanItems[index]).val(screenB.tableDatas[id][idText]+"")
            }
        },
        update: function(){
            table_name = "buyers"
            let formData = new FormData();
            formData.append("table_name", table_name)
            
                var txt = ""
                for (let index = 1; index < this.humanItems.length; index++) {
                    if(index > 1){
                        txt+=","
                    }
                    var idText = this.humanItems[index]
                    var columnName = this.humanColumns[index]
                    txt+= " "+columnName+" = '"+$("#"+idText).val()+"'"
                }
                txt+= " WHERE id = "+$("#id2U").val()
                formData.append("txt", txt)
            console.log(txt);
            axios({
                method: 'post',
                url: 'php/update.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(){
                update3.hide()
                menu.getDatas(table_name,"")
            }).catch(function(error){
                console.log(error+"");
            });
        }
    }
})

var update3 = new Vue({
    el:"#updateForm3",
    data:{
        vis: false,
        humanItems: ["id3U", "name3U", "phone3U", "address3U"],
        humanColumns: ["id", "name", "phone", "address"],
    },
    methods:{
        show: function(){
            this.vis = true
        },
        hide: function(){
            this.vis = false
        },
        copyForUpdate: function(id, screen){
            for (let index = 0; index < this.humanColumns.length; index++) {
                var idText = this.humanColumns[index]
                console.log(id+" "+idText+" "+screenE.tableDatas[id][idText])
                $("#"+this.humanItems[index]).val(screenE.tableDatas[id][idText]+"")
            }
        },
        update: function(){
            table_name = "employees"
            let formData = new FormData();
            formData.append("table_name", table_name)
            
                var txt = ""
                for (let index = 1; index < this.humanItems.length; index++) {
                    if(index > 1){
                        txt+=","
                    }
                    var idText = this.humanItems[index]
                    var columnName = this.humanColumns[index]
                    txt+= " "+columnName+" = '"+$("#"+idText).val()+"'"
                }
                txt+= " WHERE id = "+$("#id3U").val()+";"
                formData.append("txt", txt)
            
                console.log(txt);
            axios({
                method: 'post',
                url: 'php/update.php',
                responseType: 'json',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function(){
                update2.hide()
                menu.getDatas(table_name,"")
            }).catch(function(error){
                console.log(error+"");
            });
        }
    }
})


$("#id").keyup(function(){
    screenC.search("cars", "id", "#id");
});
$("#band").keyup(function(){    
    screenC.search("cars", "band", "#band");
});
$("#employeeID").keyup(function(){    
    screenC.search("cars", "employeeID", "#employeeID");
});
$("#color").keyup(function(){
    screenC.search("cars", "color", "#color");
});
$("#price").keyup(function(){
    screenC.search("cars", "price", "#price");
});
$("#idE").keyup(function(){
    screenE.search("employees", "id", "#idE");
});
$("#name").keyup(function(){
    screenE.search("employees", "name", "#name");
});
$("#phone").keyup(function(){
    screenE.search("employees", "phone", "#phone");
});
$("#address").keyup(function(){
    screenE.search("employees", "address", "#address");
});
$("#idB").keyup(function(){
    screenB.search("buyers", "id", "#idB");
});
$("#nameB").keyup(function(){
    screenB.search("buyers", "name", "#nameB");
});
$("#phoneB").keyup(function(){
    screenB.search("buyers", "phoneB", "#phoneB");
});
$("#addressB").keyup(function(){
    screenB.search("buyers", "address", "#addressB");
})
