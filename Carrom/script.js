// once everything is loaded, we run our Three.js stuff.
//Y axis is perpendicular to the surface of the board
function init() {
    var time = 0;
    var coin_radius = 1.5;
    var striker_radius = 1.8;
    var stop = 0.01;
    var Coins = [];
    var next =0;
    var c_i = -1;
    var friction = 0.98;
    var shoot_flag = 0;
    var shoot_speed = 1.1;  // speed of shooting the striker
    var y_hover = 2.5;   // For the increase in the height of the coins
    var No_before_Coins = 13;  // Number of objects before coins start 
    var stats = initStats(); 
         alert("The score decreases by 1 every second.\n w, a, s, d and space for striker controls.\n 1, 2 for different camera positions. \nThis is was made by Shaleen Garg.\n The score increases by 20 if a coin goes to a hole.");

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.add(camera);

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        
        // position and point the camera to the center of the scene
        camera.position.x = 0;
        camera.position.y = 150;
        camera.position.z = 0;
        camera.name = "camera";
        camera.lookAt(scene.position);

        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0xcc5200);
        ambientLight.name = "ambientlight";
        scene.add(ambientLight);

        //add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff, 0.6); //color and brightness
        //spotLight.position.set(-40, 60, -10);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        spotLight.name = "spotlight";
        scene.add(spotLight);

        //add board
        var geometry = new THREE.CubeGeometry( 75, 5, 70);
        var material = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("carrom.jpg")});
        board = new THREE.Mesh(geometry, material );
        board.position.z = 0;
        board.position.x = 0;
        board.position.y = 0;
        board.castShadow = true;
        board.name = "board";
        scene.add(board);


        //Add Striker

        var striker_geo = new THREE.CylinderGeometry(1.8, 1.8, 1, 35);
        var striker_material = new THREE.MeshBasicMaterial({color: 0x00FF00});
        /*var striker = new THREE.Mesh(striker_geo, striker_material);*/
        Coins.push(new THREE.Mesh(striker_geo, striker_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x + 22;   //position of the striker on the board
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "striker";
        scene.add(Coins[c_i]);

        //Add the direction of the striker shooting direction
        var shoot_length = 10;
        var shoot_geo = new THREE.CylinderGeometry(0.09, 0.09, shoot_length, 42);
        var shoot_material = new THREE.MeshBasicMaterial({color: 0xea3939});
        var shoot = new THREE.Mesh(shoot_geo, shoot_material);
        shoot_geo.applyMatrix( new THREE.Matrix4().makeTranslation( 0, shoot_length/2, 0));
        shoot.position.x = Coins[0].position.x;
        shoot.position.y = Coins[0].position.y;
        shoot.position.z = Coins[0].position.z;
        shoot.castShadow = false;
        shoot.rotation.z = (3.14 * 90)/180;   //Make it parallel to x-z plane
        shoot.rotation.y = (3.14 * 0)/180;  // Rotate it in the x-z plane
        shoot.name = "shoot";
        scene.add(shoot);

        //Holes on the board
        var hole_geo = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);  //Top left
        var hole_material = new THREE.MeshBasicMaterial({color: 0x000000});
        Coins.push(new THREE.Mesh(hole_geo, hole_material));
        c_i += 1;
        Coins[c_i].position.x = -31;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = 29;
        Coins[c_i].castShadow = false;
        Coins[c_i].name = "hole";
        scene.add(Coins[c_i]);

        c_i += 1;
        Coins.push(new THREE.Mesh(hole_geo, hole_material));
        Coins[c_i].position.x = -31;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = -29;
        Coins[c_i].castShadow = false;
        Coins[c_i].name = "hole";
        scene.add(Coins[c_i]);
        
        c_i += 1;
        Coins.push(new THREE.Mesh(hole_geo, hole_material));
        Coins[c_i].position.x = 31;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = 29;
        Coins[c_i].castShadow = false;
        Coins[c_i].name = "hole";
        scene.add(Coins[c_i]);
        
        c_i += 1;
        Coins.push(new THREE.Mesh(hole_geo, hole_material));
        Coins[c_i].position.x = 31;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = -29;
        Coins[c_i].castShadow = false;
        Coins[c_i].name = "hole";
        scene.add(Coins[c_i]);

        //add one coin RED
        c_i += 1;
        var coin_geo = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
        var coin_material = new THREE.MeshBasicMaterial({color: 0x9e0000});
        // var coin = new THREE.Mesh(coin_geo, coin_material);
        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        Coins[c_i].position.x = board.position.x;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "redcoin";
        scene.add(Coins[c_i]);
        
        // add 4 coins white
        var coin_geo = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
        var coin_material = new THREE.MeshBasicMaterial({color: 0xeee8dc});
        /*var coin = new THREE.Mesh(coin_geo, coin_material);*/
        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x + 8;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "whitecoin";
        scene.add(Coins[c_i]);


        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x - 8;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "whitecoin";
        scene.add(Coins[c_i]);
        
        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z + 8;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "whitecoin";
        scene.add(Coins[c_i]);

        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z - 8;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "whitecoin";
        scene.add(Coins[c_i]);


        //Add 4 black coins
        var coin_geo = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
        var coin_material = new THREE.MeshBasicMaterial({color: 0x00000});
        /*var coin = new THREE.Mesh(coin_geo, coin_material);*/
        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x + 6;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z - 6;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "blackcoin";
        scene.add(Coins[c_i]);

        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x - 6;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z + 6;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "blackcoin";
        scene.add(Coins[c_i]);

        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x - 6;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z - 6;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "blackcoin";
        scene.add(Coins[c_i]);
        
        Coins.push(new THREE.Mesh(coin_geo, coin_material));
        c_i += 1;
        Coins[c_i].position.x = board.position.x + 6;
        Coins[c_i].position.y = board.position.y + y_hover;
        Coins[c_i].position.z = board.position.z + 6;
        Coins[c_i].castShadow = true;
        Coins[c_i].name = "blackcoin";
        scene.add(Coins[c_i]);
        c_i += 1;
        // console.log(c_i);
        var Speed_x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var Speed_z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // add the output of the renderer to the html element

        document.getElementById("WebGL-output").appendChild(renderer.domElement);
        
        var controls = new function () {
            this.score = 0;
        }
        var gui = new dat.GUI();
        gui.add(controls, 'score').listen();
        /*gui.add(controls, '').listen();*/
        
        function NextPlayer()  //Change the coordinates for the other player to play
        {
            if(next == 1)
            {
                console.log("NextPlayer");
                for (i = 0; i< c_i; i++)
                {
                    Coins[i].position.x *= -1; 
                }
            }

        };

        //Keyboard inputs
        document.addEventListener('keydown', function(e){
            var keycode = e.keyCode;
            /*console.log(keycode);*/
            if (keycode == 37) // Left arrow
            {
                Coins[0].position.z += 0.5; 
                if (Coins[0].position.z >=18)    // Limit the striker
                    Coins[0].position.z = 18;
                shoot.position.x = Coins[0].position.x;
                shoot.position.y = Coins[0].position.y;
                shoot.position.y = Coins[0].position.y;
                shoot.position.z = Coins[0].position.z;
            }
            if (keycode == 39) //Right arrow
            {
                Coins[0].position.z -= 0.5;

                if (Coins[0].position.z <= -18)   //Limit the striker
                    Coins[0].position.z = -18;
                shoot.position.x = Coins[0].position.x;
                shoot.position.y = Coins[0].position.y;
                shoot.position.z = Coins[0].position.z;
            }
            /*if (keycode == 83)  // s to display the postion of the striker
            {
                console.log("x=", striker.position.x, "z=", striker.position.z);
            }*/
            
            if (keycode == 49) // Top view
            {
                console.log("Top View");
                camera.position.x = 0;
                camera.position.y = 150;
                camera.position.z = 0;
                camera.lookAt(scene.position);
            }
            if (keycode == 50) // slant view
            {
                console.log("horizontal view");
                camera.position.x = 50;
                camera.position.y = 50;
                camera.position.z = 50;
                camera.lookAt(scene.position);
            }
            //camera positions
            if(keycode == 73) // I 
            {
                camera.position.y += 0.5;
            }
            if(keycode == 75) // K
            {
                camera.position.y -= 0.5;
                
            }
            if(keycode == 74)// J
            {
                camera.position.z -= 0.5;
                
            }
            if(keycode == 76)// L
            {
                camera.position.z += 0.5;
                
            }
            if (keycode == 50) //Rotate view
            {
                console.log(scene.children[14]);
            }
            if (keycode == 68)  // D to rotate the shoot right
            {
                shoot.rotation.y -= 0.05;  // Rotate it in the x-z plane
            }
            if (keycode == 65)  // A to rotate the shoot left
            {
                shoot.rotation.y += 0.05;
            }
            if (keycode == 32)  //space for shooting the direction of
            {
                shoot_flag = 1;
                Speed_x[0] = shoot_speed * Math.cos(shoot.rotation.y);
                Speed_z[0] = shoot_speed * Math.sin(shoot.rotation.y);
                
            }
            if (keycode == 87) // W for increasing the shooting speed
            {
                shoot_speed += 0.1;
            }
            if (keycode == 83) // S for increasing the shooting speed
            {
                shoot_speed -= 0.1;
            }
            if (keycode == 78) //N //next player
            {
                next =1;
                NextPlayer();
                //console.log(striker); // get to know the Mesh object  
            }
        });
        function distance(a, b)
        {
            var d;
            d = Math.sqrt(Math.pow((Coins[a].position.x-Coins[b].position.x), 2) + Math.pow((Coins[a].position.z - Coins[b].position.z), 2));
            return d;
        }

        function Alpha(a, b)
        {
            var alpha;
            alpha = Math.atan(Math.abs(Coins[a].position.z - Coins[b].position.z)/Math.abs(Coins[a].position.x - Coins[b].position.y));
            return alpha;
        }

        render();

        function render() {
            var d = new Date();
            var n = d.getTime();
            if ((n - time) > 1000)
            {

                controls.score -=1; 
                time = n;
            }
            
            stats.update();
            // All of my movement
            if(shoot_flag == 1) // shoot the striker
            {
                Speed_x[0] *= friction;
                Speed_z[0] *= friction;
                Coins[0].position.x -= Speed_x[0];
                Coins[0].position.z += Speed_z[0];
                if (Math.abs(Speed_x[0]) < stop && Math.abs(Speed_z[0] < stop))
                {
                    console.log("stopped");
                    shoot_flag = 0;
                    shoot_speed = 1.1;
                }
            }
            if(shoot_flag == 0)
            {
                shoot.position.x = Coins[0].position.x;
                shoot.position.y = Coins[0].position.y;
                shoot.position.z = Coins[0].position.z;
                Coins[0].position.x = board.position.x + 22;
                if (Coins[0].position.z <= -18)   //Limit the striker
                    Coins[0].position.z = -18;
                if (Coins[0].position.z >=18)    // Limit the striker
                    Coins[0].position.z = 18;
            }
            // Make the pieces move only in the board
            for (i=0; i<c_i; i++)
            {
                //console.log(Coins[0].position.x);
                if (Coins[i].position.x <= (-31 + coin_radius) || Coins[i].position.x >= (31 + coin_radius))
                {
                    // console.log("INit");
                    Speed_x[i] *= -1;
                }
                if (Coins[i].position.z <= (-30 + coin_radius) || Coins[i].position.z >= (30 + coin_radius))
                {
                    // console.log("gsdaf");
                    Speed_z[i] *= -1;
                }
            }
            //Collisions
            for (i=0; i< c_i; i++)
            {
                for(j=i+1; j < c_i; j++)
                {
                    var d = distance(i, j);
                    // console.log(d);
                    if(d < 2*coin_radius)
                    {
                        var delta_x = (Coins[i].position.x - Coins[j].position.x)/2;
                        var delta_z = (Coins[i].position.z - Coins[j].position.z)/2;
                        Coins[i].position.x += delta_x;
                        Coins[i].position.z += delta_z;
                        // Striekr and hole
                        if (Coins[i].name == "striker" && Coins[j].name == "hole")
                        {
                            controls.score -= 20;
                            alert("You lost !!");
                            break;
                        }
                        // hole and striker
                        if (Coins[j].name == "striker" && Coins[i].name == "hole")
                        {
                            controls.score -= 20;
                            alert("You lost !!");
                            break;
                        }

                        //others
                        if(Coins[i].name != "hole" && Coins[j].name != "hole")
                        {

                            console.log(i, j);
                            alpha = Alpha(i, j);
                        
                            Vialpha = Speed_x[i] * Math.cos(alpha) + Speed_z[i] * Math.sin(alpha);
                            Viroh = Speed_z[i] * Math.cos(alpha) - Speed_x[i] * Math.sin(alpha);
                        
                            Vjalpha = Speed_x[j] * Math.cos(alpha) + Speed_z[j] * Math.sin(alpha);
                            Vjroh = Speed_z[j] * Math.cos(alpha) - Speed_x[j] * Math.sin(alpha);
                        
                            Vialpha_d = ((1-0.5)*Vialpha + (1+0.5)*Vjalpha)/2;
                            Vjalpha_d = ((1+0.5)*Vialpha + (1-0.5)*Vjalpha)/2;
                        
                            Speed_x[i] = Vialpha_d * Math.cos(alpha) - Viroh * Math.sin(alpha);
                            Speed_z[i] = Viroh * Math.cos(alpha) + Vialpha_d * Math.sin(alpha);

                            Speed_x[j] = Vjalpha_d * Math.cos(alpha) - Vjroh * Math.sin(alpha);
                            Speed_z[j] = Vjroh * Math.cos(alpha) + Vjalpha_d * Math.sin(alpha);

                        }
                        // hole and shit
                        if(Coins[i].name == "hole" || Coins[j].name == "hole")
                        {

                            if(Coins[i].name == "hole")
                            {
                                Coins[i].position.x = 10000;
                                if (Coins[i].name == "blackcoin")
                                {
                                    //black player
                                    controls.score -= 5;
                                }
                                if (Coins[i].name == "whitecoin")
                                {
                                    // white player
                                    controls.score += 5;
                                }
                            }
                            else if(Coins[j].name == "hole")
                            {
                                Coins[j].position.x = 10000;
                                if (Coins[j].name == "blackcoin")
                                {
                                    controls.score -= 5;
                                    //black player
                                }
                                if (Coins[j].name == "whitecoin")
                                {
                                    controls.score += 5;
                                    // white player
                                }
                            }
                        }


                    }
                }
            }

            for (i=0; i< c_i; i++)
            {
                Speed_x[i] *= friction;
                Speed_z[i] *= friction;
                Coins[i].position.x -= Speed_x[i];
                Coins[i].position.z += Speed_z[i];
            }
            
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            
        }

        function initStats() {

            var stats = new Stats();

            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
        }
    }
    window.onload = init
