	var urlIcon = "http://leylajacqueline.com/proyectos/eventPointsSass/img/pin.png";

	function funcionalidad() {
		//=================================================================
		//ACORDEON
		//=================================================================
		var acordeon = document.getElementsByClassName("toggleFecha");

		for (var i = 0; i < acordeon.length; i++) {
		    acordeon[i].onclick = function(){
		        this.classList.toggle("active");
		        var panel = this.nextElementSibling;

		        if (panel.style.display === "block") {
		            panel.style.display = "none";
		        } else {
		            panel.style.display = "block";
		        }

		    }
		}

		//=============================================================================
		//MOSTRAR PANTALLA CON LOS DETALLES DEL EVENTO AL HACER CLIC EN "VER DETALLES"
		//=============================================================================
		var btnVerDetalles = document.getElementsByClassName("btn-verDetalles");
		//console.log(btnVerDetalles.length);

		for (var i = 0; i < btnVerDetalles.length; i++){
			btnVerDetalles[i].onclick = function(){
				//console.info('hizo clic');
				var detalle = this.parentNode.nextElementSibling;
				detalle.style.display = 'block';
				document.body.classList.add('Detalle');
			}
		}

		//=================================================================
		//BOTÓN REGRESAR AL LISTADO DE EVENTOS
		//=================================================================
		var btnVolver = document.getElementById('btn-volver');
		var listaDetalles = document.querySelectorAll(".detallesEvento");

		btnVolver.addEventListener('click', function(e) {
			document.body.classList.remove('Detalle');

			for(var i = 0; i < listaDetalles.length; i++){
				listaDetalles[i].style.display = 'none';
			}
			
		});


		//=================================================================
		//SHARE BUTTONS
		//=================================================================

		var shareButtons = document.querySelectorAll('.compartir a');
		//console.log('share: ' + shareButtons.length);

		function fCompartir(tipo, url){
			var windowShare;

			switch(tipo){
				case 'twitter':
					windowShare = window.open('https://twitter.com/share?url=' + url, 'twitter-popup', 'height=350,width=600');
					break;
				case 'facebook':
					windowShare = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'facebook-popup', 'height=350,width=600');
					break;
				default:
					windowShare = window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&source=LinkedIn', 'linkedin-popup', 'height=350,width=600');
			}

			if(windowShare.focus) { windowShare.focus(); }
			return false;
		}

		for ( var i = 0; i < shareButtons.length; i++ ){
			shareButtons[i].onclick = function(evento){
				var evento = evento || window.event;
				var elemento = evento.target || evento.srcElement;

				var shareTipo = elemento.getAttribute('class');
				var shareUrl = elemento.parentNode.parentNode.getAttribute('data-url');
				//console.info('Tú eres del tipo: ' + shareTipo );
				//console.info('Mi url es: ' + shareUrl);
				
				fCompartir(shareTipo, shareUrl);

			}
		}

	};

	function obtenerDireccionCompleta(err, data){
		var direccion = "";

		if(err){
			console.info("Ha ocurrido un horror obteniendo la dirección: " + err);
		}else{
			if(data.status !== "ZERO_RESULTS"){
				direccion = data.results[0].formatted_address;
			}
		}
		return direccion;
	}

	//=======================================
	//Petición AJAX*/
	//=======================================
	function peticionAjax(url, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
        	if(xmlHttp.readyState === 4){
        		var error, data;        		
        		
        		if(xmlHttp.status === 200){
        			data = JSON.parse(xmlHttp.responseText);
        		} else{
        			error = JSON.parse(xmlHttp.responseText);
        		} 
        		callback(error, data);
        	}
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
	}

	function agruparPorFecha(data) {
	
		//Ordenamos por fecha
		data.sort(function(a,b){
  			return new Date(a.date) - new Date(b.date);
		});
		
		//creamos un array con objetos agrupados por fecha
		//objeto = { fecha: '2017-03-15', lista: [] }
		var agrupada = [];
		var fecha = data[0].date.substring(0,10);
		var lista = [];

		for (var i = 0; i < data.length; i++){
			console.log('número de vuelta--> ' + i);
			var nueva = data[i].date.substring(0,10);
			//console.log('Fecha: ' + data[i].date);

			if (nueva === fecha){
				lista.push(data[i]);
				
				//Si es el último elemento creamos el objeto y agregamos
				if(i === (data.length - 1)){
					var objeto = {
						'fecha': fecha,
						'lista': lista
					}
					agrupada.push(objeto);
				}

			} else {
				var objeto = {
					'fecha': fecha,
					'lista': lista
				}

				agrupada.push(objeto);
				var lista = [];
				lista.push(data[i]);
				fecha = data[i].date.substring(0,10);
			}
		}
		
		return agrupada;

	}

	var literalesFecha = {
		obtenerDiaSemana: function(dia){
			var literal = '';
			switch(dia){
				case 0:
					literal = 'Domingo';
					break;
				case 1:
					literal = 'Lunes';
					break;
				case 2:
					literal = 'Martes';
					break;
				case 3: 
					literal = 'Miércoles';
					break;
				case 4:
					literal = 'Jueves';
					break;
				case 5:
					literal = 'Viernes';
					break;
				default:
					literal = 'Sábado';
			}
			return literal;
		},
		obtenerMes: function(mes){
			var literal = '';
			switch(mes){
				case 0:
					literal = 'Enero';
					break;
				case 1:
					literal = 'Febrero';
					break;
				case 2:
					literal = 'Marzo';
					break;
				case 3:
					literal = 'Abril';
					break;
				case 4:
					literal = 'Mayo';
					break;
				case 5:
					literal = 'Junio';
					break;
				case 6:
					literal = 'Julio';
					break;
				case 7:
					literal = 'Agosto';
					break;
				case 8:
					literal = 'Septiembre';
					break;
				case 9:
					literal = 'Octubre';
					break;
				case 10:
					literal = 'Noviembre';
					break;
				default:
					literal = 'Diciembre';
			}
			return literal;
		} 

	}


	function pintarEventos(err, data) {
		
		var eventos = [];

		if(err){
			console.info("Ha ocurrido un horror: " + err);
		}else{
			
			//ordenados los eventos por fecha
			eventos = agruparPorFecha(data);
			
			//helpers de Handlebars
			Handlebars.registerHelper('duo_botones', function(){
				var html = "<div class='duobotones'>";
				html +=	"<a class='btn-iralsitio' href='" + this.source.event_url + "'>IR AL SITIO</a>";
				html += "<a class='btn-registro' href='" + this.target_url + "'>QUIERO APUNTARME</a>";	
				html += "</div>";
				return html;
			});

			Handlebars.registerHelper('fecha_literal', function() {
				var fecha = new Date(this.fecha);
				return "<div class='toggleFecha'><span class='dialiteral'>" + literalesFecha.obtenerDiaSemana(fecha.getDay()) + ' ' + fecha.getDate() + "</span><span class='mesliteral'>, " + literalesFecha.obtenerMes(fecha.getMonth()) + "</span></div>";
			});

			Handlebars.registerHelper('hora_evento', function() {
				var fecha = new Date(this.date);
				var horas = (fecha.getHours() < 10) ? '0' + fecha.getHours() : fecha.getHours();
				var minutos = (fecha.getMinutes() < 10) ? '0' + fecha.getMinutes() : fecha.getMinutes();
				return horas + ':' + minutos;
			});

			Handlebars.registerHelper('precio_evento', function() {
				var precio = (this.price.isFree) ? 'FREE' : this.price.details;
				return precio;
			});

			Handlebars.registerHelper('fecha_completa', function() {
				var fecha = new Date(this.date);
				var dia = (fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate();
				return literalesFecha.obtenerDiaSemana(fecha.getDay()) + ' ' + dia + " de " + literalesFecha.obtenerMes(fecha.getMonth());
			});

			Handlebars.registerHelper('notas_evento', function() {
				return (this.location.notes) ? ', ' + this.location.notes : '';
			});


			Handlebars.registerHelper('direccion_evento', function() {
				var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.location.lat + "," + this.location.lng;

				function obtenerDireccion(url){
					console.info(url);

					var xmlHttp = new XMLHttpRequest();

			        xmlHttp.onreadystatechange = function() {
			        	if(xmlHttp.readyState === 4){
			        		var error, data;
			        		var direccion = "";        		
			        		
			        		if(xmlHttp.status === 200){
			        			data = JSON.parse(xmlHttp.responseText);
			        			console.info("entra en data");
			        		} else {
			        			error = JSON.parse(xmlHttp.responseText);
			        			console.info("entra en error");
			        		} 
			        		
			        		if(data.status === 'OK'){
			        			direccion = data.results[0].formatted_address;
			        			console.info("la direccion es " + direccion);
			        		}
			        		return direccion;
			        	}
			        };
			        xmlHttp.open("GET", url, true);
			        xmlHttp.send();
		    	}

		    	return new Handlebars.SafeString(obtenerDireccion(url));

			});


			Handlebars.registerHelper('imagen_mapa', function() {
				var url = "http://maps.google.com/maps/api/staticmap?center=" + this.location.lat + "," + this.location.lng + "&size=350x350&zoom=16&maptype=roadmap&markers=icon:%20"+urlIcon+"|shadow:true|"+this.location.lat+","+this.location.lng+"&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true&key=" + keys.keyMapaStatico;
				return "<img src=" + url + " />";
			});

			Handlebars.registerHelper('enlaces_compartir', function() {
				var html = "<ul class='compartir' data-url="+ this.target_url +">";
				html += "<li><a class='twitter' title='Twitter'>Twitter</a></li>";
				html += "<li><a class='facebook' title='Facebook'>Facebook</a></li>";
				html += "<li><a class='linkedin' title='Linkedin'>Linkedin</a></li>";
				html += "</ul>";
				return html;
			});
			
			// Grab the template script
				var theTemplateScript = document.getElementById('plantilla').innerHTML;

				// Compile the template
				var theTemplate = Handlebars.compile(theTemplateScript);

				// Pass our data to the template
				var theCompiledHtml = theTemplate(eventos);

				document.getElementById('contenido').innerHTML = theCompiledHtml;
				funcionalidad();
			
		}

	}

	var urlDataEventos = 'http://eventpoints.osweekends.com/api/events';
	peticionAjax(urlDataEventos, pintarEventos);