import {Component, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

var d3 = window['d3'] || {};
var vizuly = window['vizuly'] || {};


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navController: NavController, public elementRef: ElementRef) {
      console.log(d3)
  }

  ngOnInit(){     
       
        var el = this.elementRef.nativeElement;
        var attrName = el.children && el.children[0] && el.children[0].attributes && el.children[0].attributes[0] && el.children[0].attributes[0].name;
       
        var componentContainer = d3.select(this.elementRef.nativeElement);
        var d3Container = componentContainer.select("#display");

        // html element that holds the chart
        var viz_container;

        // our radial components and an array to hold them
        var viz1,viz2,viz3,vizs=[];

        // our radial themes and an array to hold them
        var theme1,theme2,theme3,themes;

        // our div elements we will put radials in
        var div1,div2,div3,divs;

        // show reel for demo only;
        var reels=[];



    //Set display size based on window size.
    var rect = document.body.getBoundingClientRect();
    var screenWidth = (rect.width < 960) ? Math.round(rect.width*.95) : Math.round((rect.width - 210) *.95)

    viz_container = d3.selectAll("#viz_container")
        //.style("width",screenWidth + "px")
        //.style("height","600px");


initialize();


function initialize() {

    //Here we use the three div tags from our HTML page to load the three components into.
    div1 = d3.select("#div1");
    //div2 = d3.select("#div2");
    //div3 = d3.select("#div3");
    //Store the divs in an array for easy access
    divs=[div1];

    //Here we create our three radial progress components by passing in a parent DOM element (our div tags)
    viz1 = vizuly.component.radial_progress(document.getElementById("div1"));
    //viz2 = vizuly.component.radial_progress(document.getElementById("div2"));
    //viz3 = vizuly.component.radial_progress(document.getElementById("div3"));
    //Store the vizs in an array for easy access
    vizs=[viz1];

    //Here we create three vizuly themes for each radial progress component.
    //A theme manages the look and feel of the component output.  You can only have
    //one component active per theme, so we bind each theme to the corresponding component.
    theme1 = vizuly.theme.radial_progress(viz1).skin(vizuly.skin.RADIAL_PROGRESS_FIRE);
    //theme2 = vizuly.theme.radial_progress(viz2).skin(vizuly.skin.RADIAL_PROGRESS_FIRE);
    //theme3 = vizuly.theme.radial_progress(viz3).skin(vizuly.skin.RADIAL_PROGRESS_FIRE);
    themes=[theme1];


    //Like D3 and jQuery, vizuly uses a function chaining syntax to set component properties
    //Here we set some bases line properties for all three components.
    vizs.forEach(function (viz,i) {
        viz.data(80)                       // Current value
            .height(600)                    // Height of component - radius is calculated automatically for us
            .min(0)                         // min value
            .max(100)                       // max value
            .capRadius(1)                   // Sets the curvature of the ends of the arc.
            .on("tween",onTween)            // On the arc animation we create a callback to update the label
            .on("mouseover",onMouseOver)    // mouseover callback - all viz components issue these events
            .on("mouseout",onMouseOut)      // mouseout callback - all viz components issue these events
            .on("click",onClick);           // mouseout callback - all viz components issue these events
    })


    //
    // Now we set some unique properties for all three components to demonstrate the different settings.
    //
    vizs[0]
        .startAngle(250)                         // Angle where progress bar starts
        .endAngle(110)                           // Angle where the progress bar stops
        .arcThickness(.12)                        // The thickness of the arc (ratio of radius)
        .label(function (d,i) {                  // The 'label' property allows us to use a dynamic function for labeling.
            return d3.format(".0f")(d);
        });

    // vizs[1]
    //     .startAngle(210)
    //     .endAngle(150)
    //     .arcThickness(.07)
    //     .label(function (d,i) { return d3.format("$,.2f")(d); });

    // vizs[2]
    //     .startAngle(180)
    //     .endAngle(180)
    //     .arcThickness(.04)
    //     .label(function (d,i) { return d3.format(".0f")(d) + "%"; });

    //We use this function to size the components based on the selected value from the RadiaLProgressTest.html page.
    //hangeSize(document.getElementById("displaySelect").value);
    changeSize('800,600');

   
}

//Here we want to animate the label value by capturin the tween event
//that occurs when the component animates the value arcs.
function onTween(viz,i) {
    viz.selection().selectAll(".vz-radial_progress-label")
        .text(viz.label()(viz.data() * i));
}

function onMouseOver(viz,d,i) {
    //We can capture mouse over events and respond to them
}

function onMouseOut(viz,d,i) {
    //We can capture mouse out events and respond to them
}

function onClick(viz,d,i) {
    //We can capture click events and respond to them
}

//This changes the size of the component by adjusting the radius and width/height;
function changeSize(val) {
    var s : number|string[] = String(val).split(",");
    //viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', s[1] + 'px');

    var divWidth = s[0] * 0.80 / 3;

    divs.forEach(function (div,i) {
        div.style("width",divWidth + 'px').style("margin-left", (s[0] *.05) + "px");
        vizs[i].width(divWidth).height(divWidth).radius(divWidth/2.2).update();
    })

}

        
    }
}
