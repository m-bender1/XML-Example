function loadXMLDoc(filename) {

   if (window.ActiveXObject) {

      xhttp = new ActiveXObject("Msxml2.XMLHTTP");

   }

   else {

      xhttp = new XMLHttpRequest();

   }

   xhttp.open("GET", filename, false);



   try {

      xhttp.responseType = "msxml-document";

   }

   catch (err) { }

   xhttp.send("");

   return xhttp.responseXML;

}

function countRows() {
   let table = document.getElementById("ltcTable");
   // get total # of rows in table (minus 1 for headers)
   document.getElementById("countContainer").innerHTML = "Total Rows Returned: <b>" + (table.rows.length - 1) + "</b>";
}



function renderOutput() {

   // set filename for prev. function

   xml = loadXMLDoc("ltc-stops-inventory.xml");

   xslt = loadXMLDoc("ltc-stops.xslt");

   // get values from textboxes

   var stopName = document.getElementById("stopName").value;

   var routeNum = document.getElementById("routeNumber").value;

   //need route number to be 3 digits(ie; 6 -- > 006)

   if (routeNum.length == 1) {

      routeNum = "00" + routeNum;

      // want to ensure routeNum is an integer not a string

      // routeNum = parseInt(routeNum);

   }

   else if (routeNum.length == 2) {

      routeNum = "0" + routeNum;

      // routeNum = parseInt(routeNum);

   }



   if (window.ActiveXObject || xhttp.responseType == "msxml-document") {

      var template = new ActiveXObject("Msxml2.XslTemplate.6.0")

      template.stylesheet = xslt



      var proc = template.createProcessor()

      proc.input = xml;

      proc.addParameter("stopName", stopName);

      proc.addParameter("routes", routeNum);

      console.log(stopName, routeNum)



      proc.transform()

      document.getElementById("xsltOutputContainer").innerHTML = proc.output

   }

   else if (typeof XSLTProcessor !== 'undefined') {
      var xsltProcessor = new XSLTProcessor()
      xsltProcessor.importStylesheet(xslt);
      // set parameters with textbox values
      // trimmed in case any spaces are added 
      xsltProcessor.setParameter(null, "stopName", stopName.trim());
      xsltProcessor.setParameter(null, "routeNum", routeNum.trim());
      var resultDocument = xsltProcessor.transformToFragment(xml, document);
      document.getElementById("outputContainer").innerHTML = "";
      document.getElementById("outputContainer").appendChild(resultDocument);
      countRows();
   }
}

