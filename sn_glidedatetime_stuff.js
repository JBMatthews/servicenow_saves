// GlideDateTime Resources


// Add customized time to current date
var myDate= new GlideDate();
gs.info(myDate + ' 02:00:00','yyyy-MM-dd HH:mm:ss'); 




// Hours / Minutes / Seconds
var gd = new GlideDate();
gs.info(gd.getByFormat("hh-mm-ss:SSS a z"));

gs.info(gd.getByFormat("a"));
gs.info(gd.getByFormat("hh"));
gs.info(gd.getByFormat("HH"));
gs.info(gd.getByFormat("mm"));   
gs.info(gd.getByFormat("ss"));
gs.info(gd.getByFormat("SSS"));
gs.info(gd.getByFormat("z"));    //Lowercase z
gs.info(gd.getByFormat("zzzzz")); //Lowercase z
gs.info(gd.getByFormat("Z"));    //Uppercase Z

/*Output:
*** Script: 09-26-03:724 PM UTC

*** Script: PM
*** Script: 09
*** Script: 21
*** Script: 26
*** Script: 03
*** Script: 724
*** Script: UTC
*** Script: Coordinated Universal Time
*** Script: +0000
*/