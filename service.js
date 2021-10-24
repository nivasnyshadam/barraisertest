const knex = require('./knex')


function addUser(data){
    return knex("people").insert(data).then((row)=>{
       // console.log(row[0])     
          return knex("people").where("id",row[0]).select("*");
    })
}
function getUser(id){
    return knex("people").where("id",id).select("*");
}

function addReport(data){
    return knex("records").insert(data).then((row)=>{
        // console.log(row[0])     
           return knex("records").where("id",row[0]).select("*").then((data1)=>{
               let risk =0
             
               let array = data1[0].symptoms.split(",")
              
               //No symptoms, No travel history, No contact with covid positive patient - Risk = 5%
               if(array.length==0 && data1[0].travel_history==0 && data1[0].contactWithCovidPatient==0){
                   risk = 5
                   console.log(risk)
                }
                //Any one symptom, travel history or contact with covid positive patient is true - Risk = 50%
                if(array.length==1 && data1[0].travel_history==1 && data1[0].contactWithCovidPatient==1){
                    risk = 50
                    console.log(risk)
                }
                //Any two symptoms, travel history or contact with covid positive patient is true - Risk = 75%
                if(array.length==2 && data1[0].travel_history==1 && data1[0].contactWithCovidPatient==1){
                    risk = 75
                    console.log(risk)
                }
                //Greater than 2 symptoms, travel history or contact with covid positive patient is true - Risk = 95%
                if(array.length>2 && data1[0].travel_history==1 && data1[0].contactWithCovidPatient==1){
                    risk = 95
                    console.log(risk)
                }
            return risk
            });
     })
}

function addResult(data){
    return knex("covidresults").insert(data).then((row)=>{   
          return knex("covidresults").where("id",row[0]).select("*");
    })
}

function getZone(id){
     
   
    return knex.select('*').from('people').join('covidresults', function() {
        
          this.on('covidresults.userId', '=', 'people.id')

      }).then(data=>{
          let count =0;
          console.log(data)
          return data;
      })
}
module.exports={
    addUser,
    getUser,
    addReport,
    addResult,
    getZone
}