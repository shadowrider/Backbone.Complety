define(function(require, exports, module) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var Complety = require('use!backbone-plugins/backbone.complety');


  var Car = Backbone.Model.extend({
    brand: "",
    imgURL: ""
  });

  var Cars = Backbone.Collection.extend({
    model: Car
  });

  var famousBrands = new Cars();
  famousBrands.add(new Car({brand: "Acura", imgURL: "http://www.malibucustomz.com/store/images/acura_logo.jpg"}));
  famousBrands.add(new Car({brand: "Alfa Romeo", imgURL: "http://upload.wikimedia.org/wikipedia/en/thumb/2/24/Alfa_Romeo.svg/180px-Alfa_Romeo.svg.png"}));
  famousBrands.add(new Car({brand: "Aston Martin", imgURL: "http://www.seeklogo.com/images/A/Aston_Martin-logo-E850023998-seeklogo.com.gif"}));
  famousBrands.add(new Car({brand: "Audi", imgURL: "http://audi-rs4-rs6.com/wp-content/uploads/2012/03/audi_new-logo_09.jpg"}));
  famousBrands.add(new Car({brand: "BMW", imgURL: "http://www.logostage.com/logos/bmw.jpg"}));
  famousBrands.add(new Car({brand: "Bentley", imgURL: "http://www.logostage.com/logos/bentley.gif"}));
  famousBrands.add(new Car({brand: "Buick", imgURL: "http://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Buick_Logo.png/150px-Buick_Logo.png"}));
  famousBrands.add(new Car({brand: "Bugatti", imgURL: "http://www.yourlogoresources.com/wp-content/uploads/2011/08/bugatti-logo.jpg"}));
  famousBrands.add(new Car({brand: "Cadillac", imgURL: "http://www.cadillacfaq.com/faq/answers/logos/cadillac-thum.jpg"}));
  famousBrands.add(new Car({brand: "Caterham", imgURL: "http://www.seeklogo.com/images/C/Caterham_Super_7_-_Super_Seven-logo-A7EC8E0BF8-seeklogo.com.gif"}));
  famousBrands.add(new Car({brand: "Chery", imgURL: "http://www.imotocar.co.za/wp-content/uploads/2011/03/larger-chery-logo.jpg"}));
  famousBrands.add(new Car({brand: "Chevrolet", imgURL: "http://www.logodesignsense.com/blog/wp-content/uploads/2011/01/Chevrolet-Logo.jpg"}));
  famousBrands.add(new Car({brand: "Chrysler", imgURL: "http://www.soundracer.se/images/Chrysler_Logo.jpg"}));
  famousBrands.add(new Car({brand: "Citroen", imgURL: "http://www.carlogos.org/uploads/carlogos/citroen-logo-3.gif"}));
  famousBrands.add(new Car({brand: "Daewoo", imgURL: "http://2.bp.blogspot.com/_WNv-uMyAPk4/TQ-1IQkUosI/AAAAAAAAAL4/EQ-LQCXYNuk/s1600/daewoo-logo.jpg"}));
  famousBrands.add(new Car({brand: "Daihatsu", imgURL: "http://car-logos.50webs.com/logo/daihatsu/daihatsu3.jpg"}));
  famousBrands.add(new Car({brand: "Daimler", imgURL: "http://www.seeklogo.com/images/D/Daimler-logo-06C7791A23-seeklogo.com.gif"}));
  famousBrands.add(new Car({brand: "Dodge", imgURL: "http://www.carpages.ca/blog/wp-content/uploads/2011/01/dodge-logo.jpg"}));
  famousBrands.add(new Car({brand: "Eagle", imgURL: "http://www.centercaps101.com/_images/products/ws5/Eagle/Eagle-logo.gif"}));
  famousBrands.add(new Car({brand: "Fiat", imgURL: "http://upload.wikimedia.org/wikipedia/en/7/70/Fiat_logo.jpg"}));
  famousBrands.add(new Car({brand: "Ferrari", imgURL: "http://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/100px-Ferrari-Logo.svg.png"}));
  famousBrands.add(new Car({brand: "Ford", imgURL: "http://www.muscularmustangs.com/database/fordlogo2003.jpg"}));
  famousBrands.add(new Car({brand: "GM", imgURL: "http://upload.wikimedia.org/wikipedia/en/b/b6/GM,_logo.png"}));
  famousBrands.add(new Car({brand: "GMC", imgURL: "http://www.ryanontheradio.com/wp-content/uploads/2012/03/GMC.jpg"}));
  famousBrands.add(new Car({brand: "Ginetta", imgURL: "http://upload.wikimedia.org/wikipedia/en/2/24/Ginetta_logo.png"}));
  famousBrands.add(new Car({brand: "Holden", imgURL: "http://www.carlogo.org/lsh/holdenlogo.jpg"}));
  famousBrands.add(new Car({brand: "Honda", imgURL: "http://2.bp.blogspot.com/_vuItPD-J-XE/S86M7NFFgFI/AAAAAAAACFg/jOj36H_zRws/s1600/honda_logo.jpg"}));
  famousBrands.add(new Car({brand: "Hummer", imgURL: "http://www.pycomall.com/images/P/p-19149.jpg"}));
  famousBrands.add(new Car({brand: "Hyundai", imgURL: "http://www.caradvice.com.au/wp-content/uploads/2009/04/hyundai_logo_file_983.jpg"}));
  famousBrands.add(new Car({brand: "Infiniti", imgURL: "http://www.vehicleleaseltd.co.uk/images/makes/infiniti_logo.png"}));
  famousBrands.add(new Car({brand: "Isuzu", imgURL: "http://www.jmariete.com/images/IsuzuLogo1.gif"}));
  famousBrands.add(new Car({brand: "Jaguar", imgURL: "http://upload.wikimedia.org/wikipedia/nah/9/99/Jaguar_logo.png"}));
  famousBrands.add(new Car({brand: "Jeep", imgURL: "http://www.carlogos.org/uploads/carlogos/jeep-logo-3.jpg"}));
  famousBrands.add(new Car({brand: "Kia", imgURL: "http://www.mcgrathkia.com/dealerimages/Dealer%204785%20Images/kia%20logo.jpg"}));
  famousBrands.add(new Car({brand: "Lamborghini", imgURL: "http://4.bp.blogspot.com/_AcBUSVxs82w/TJRAAJlJ1bI/AAAAAAAAhjg/yNPYcEn9Jcc/s1600/Lamborghini_Logo.jpg"}));
  famousBrands.add(new Car({brand: "Lancia", imgURL: "http://upload.wikimedia.org/wikipedia/en/1/1f/Lancia_Logo.jpg"}));
  famousBrands.add(new Car({brand: "Land Rover", imgURL: "http://www.carlogo.org/lsl/land_rover_logo.jpg"}));
  famousBrands.add(new Car({brand: "LDV", imgURL: "http://www.carlogo.org/lsl/ldvlogo3.jpg"}));
  famousBrands.add(new Car({brand: "Lexus", imgURL: "http://www.carlogos.org/uploads/carlogos/lexus-logo-3.jpg"}));
  famousBrands.add(new Car({brand: "Lincoln", imgURL: "http://4.bp.blogspot.com/-3-xac9iAobQ/ThWwk5DLEiI/AAAAAAAAblE/oRpXZPNq-Dw/s1600/Lincoln+Logo4.jpg"}));
  famousBrands.add(new Car({brand: "Lotus", imgURL: "http://www.carlogo.org/lsl/lotuslogo9.jpg"}));
  famousBrands.add(new Car({brand: "MG", imgURL: "http://upload.wikimedia.org/wikipedia/en/archive/c/cb/20120405081423!MG_logo.png"}));
  famousBrands.add(new Car({brand: "Maserati", imgURL: "http://upload.wikimedia.org/wikipedia/en/6/64/Maserati_logo.svg"}));
  famousBrands.add(new Car({brand: "Mazda", imgURL: "http://www.barnabe-mazda.com/ImagesCustom/132/mazda.png"}));
  famousBrands.add(new Car({brand: "McLaren", imgURL: "http://upload.wikimedia.org/wikipedia/commons/c/c1/Mclaren_logo.jpg"}));
  famousBrands.add(new Car({brand: "Mercedes-Benz", imgURL: "http://www.logodesignlove.com/images/evolution/mercedes-benz-logo-design.jpg"}));
  famousBrands.add(new Car({brand: "Mini", imgURL: "http://www.auto-insight.ca/wp-content/uploads/2010/08/MINI.jpg"}));
  famousBrands.add(new Car({brand: "Mercury", imgURL: "http://www.wyomingvehicleservicecontract.com/images/car_logos/mercury_logo.jpg"}));
  famousBrands.add(new Car({brand: "Mitsubishi", imgURL: "http://courtb0402.files.wordpress.com/2010/09/mitsubishi-logo4.png"}));
  famousBrands.add(new Car({brand: "Nissan", imgURL: "http://www.gomonews.com/wp-content/uploads/2009/07/nissan-logo.gif"}));
  famousBrands.add(new Car({brand: "Oldsmobile", imgURL: "http://www.carlogos.org/uploads/carlogos/oldsmobile-logo-5.jpg"}));
  famousBrands.add(new Car({brand: "Opel", imgURL: "http://car-logos.50webs.com/logo/opel/opel1.jpg"}));
  famousBrands.add(new Car({brand: "Packard", imgURL: "http://www.cartuningcentral.com/wp-content/uploads/2009/10/Packard-Car-Logo.jpg"}));
  famousBrands.add(new Car({brand: "Perodua", imgURL: "http://www.carlogo.org/lsp/perodua-logo.jpg"}));
  famousBrands.add(new Car({brand: "Peugeot", imgURL: "http://www.designboom.com/cms/images/_andy/peu1.jpg"}));
  famousBrands.add(new Car({brand: "Pontiac", imgURL: "http://www.carlogo.org/lsp/pontiac-logo.gif"}));
  famousBrands.add(new Car({brand: "Porsche", imgURL: "http://macan-porsche.com/wp-content/uploads/2012/03/Porsche-Logo.png"}));
  famousBrands.add(new Car({brand: "Proton", imgURL: "http://upload.wikimedia.org/wikipedia/en/thumb/9/97/PROTON_LOGO.svg/308px-PROTON_LOGO.svg.png"}));
  famousBrands.add(new Car({brand: "Renault", imgURL: "http://www.soundracer.se/images/renault-logo.JPG"}));
  famousBrands.add(new Car({brand: "Rolls Royce", imgURL: "http://images2.wikia.nocookie.net/__cb20111204083237/topgear/images/1/13/Rolls_Royce_logo.jpg"}));
  famousBrands.add(new Car({brand: "Saab", imgURL: "http://images.wikia.com/logopedia/images/e/e2/Saab_logo.jpg"}));
  famousBrands.add(new Car({brand: "Saturn", imgURL: "http://www.autoguide.com/gallery/d/52502-4/Saturn+Logo+300+DPI.jpg"}));
  famousBrands.add(new Car({brand: "Scion", imgURL: "http://www.nittolegends.com/images/Scion-logo.png"}));
  famousBrands.add(new Car({brand: "Seat", imgURL: "http://upload.wikimedia.org/wikipedia/ro/2/2b/Seat_logo.jpg"}));
  famousBrands.add(new Car({brand: "Shelby", imgURL: "http://images2.wikia.nocookie.net/__cb20100529022524/automobile/images/8/89/Shelby_logo.jpg"}));
  famousBrands.add(new Car({brand: "Skoda", imgURL: "http://www.officialpsds.com/images/thumbs/Skoda-Logo-psd51121.png"}));
  famousBrands.add(new Car({brand: "Smart", imgURL: "http://www.auto-insight.ca/wp-content/uploads/2010/08/smart.png"}));
  famousBrands.add(new Car({brand: "Subaru", imgURL: "http://upload.wikimedia.org/wikipedia/en/thumb/4/47/Subaru_logo.svg/250px-Subaru_logo.svg.png"}));
  famousBrands.add(new Car({brand: "Suzuki", imgURL: "http://coolcanucks.ca/wp-content/uploads/2011/06/suzuki-logo-3.png"}));
  famousBrands.add(new Car({brand: "Tata Motors", imgURL: "http://openmarkets.in/wp-content/uploads/2012/02/tmot.png"}));
  famousBrands.add(new Car({brand: "Tesla Motors", imgURL: "http://www.carlogos.org/uploads/carlogos/Tesla-Motors-logo-3.jpg"}));
  famousBrands.add(new Car({brand: "Toyota", imgURL: "http://fromauto.com/wp-content/uploads/2011/10/TOYOTA-Logo-300x252.jpg"}));
  famousBrands.add(new Car({brand: "TVR", imgURL: "http://www.carlogo.org/lst/tvr_logo1.png"}));
  famousBrands.add(new Car({brand: "Vauxhall", imgURL: "http://upload.wikimedia.org/wikipedia/en/d/dd/Vauxhall_Logo.jpg"}));
  famousBrands.add(new Car({brand: "Volkswagen", imgURL: "http://www.republicofcode.com/tutorials/photoshop/volkswagen/17.gif"}));
  famousBrands.add(new Car({brand: "Volvo", imgURL: "http://upload.wikimedia.org/wikipedia/en/thumb/3/3f/T2005_1664_450px.jpg/220px-T2005_1664_450px.jpg"}));
  famousBrands.add(new Car({brand: "Ultima", imgURL: "http://www.famous-logos.com/brands/auto/auto-logo-Ultima-Cars-USA-0004-9650-brand.gif"}));

  var App = Backbone.View.extend({

    initialize: function() {
      var complety = new Backbone.Complety({
        collection: famousBrands,
        targetContainer: '.input-complete',
        searchAttr: "brand"
      });
      var completyArea = new Backbone.Complety({
        collection: famousBrands,
        targetContainer: '.area-complete',
        isArea: true,
        searchAttr: "brand"
      });
      var multiComplety = new Backbone.Complety({
        collection: famousBrands,
        targetContainer: '.multi-input-complete',
        isMultiple: true,
        searchAttr: "brand"
      });
      var multiCompletyArea = new Backbone.Complety({
        collection: famousBrands,
        targetContainer: '.multi-area-complete',
        isArea: true,
        isMultiple: true,
        searchAttr: "brand"
      });
      var customComplety = new Backbone.Complety({
        collection: famousBrands,
        targetContainer: '.custom-input-complete',
        searchAttr: "brand",
        ignoreCase: true,
        Template: {
          template: '<table><tr class="trow"><td><img height="40" src="<%= img %>"></td><td class="title"><%= name %></td></tr></table>',
          values: {
            name: 'brand',
            img: 'imgURL'
          }
        }
      });
      var customCompletyArea = new Backbone.Complety({
        collection: famousBrands,
        targetContainer: '.custom-area-complete',
        isArea: true,
        isMultiple: true,
        searchAttr: "brand",
        ignoreCase: true,
        Template: {
          template: '<table><tr class="trow"><td><img height="40" src="<%= img %>"></td><td class="title"><%= name %></td></tr></table>',
          values: {
            name: 'brand',
            img: 'imgURL'
          }
        }
      });
    },

    render: function(options) {

    }

  });

  return App;

});