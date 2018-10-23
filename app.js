new Vue({
  el: '#app',
  data: {
      playerHealth:100,
      monsterHealth:100,
      gameIsRun: false,
      turns:[]
  },
  methods:{
      startGame:function(){
          //   toggle the section
          this.gameIsRun = !this.gameIsRun;
          //   full blood for player and monster
          this.playerHealth = 100;
          this.monsterHealth = 100;
        //   clear attack log
          this.turns = [];
      },
      attack:function(){
        //   attack monster
        let damageM = this.damageAmt(3,10);
        this.monsterHealth -= damageM;
        this.turns.unshift({
            isPlayer:true,
            text:'Player attacks monster for ' +damageM
        });
        

        //   attack player
        let attackP = this.damageAmt(2,7);
        this.playerHealth -= attackP;
        this.turns.unshift({
            isPlayer:false,
            text:'Monster attacks player for: ' +attackP
        });
      },
      specialAttack:function(){
        // attach monster
        let SdamageM = this.damageAmt(20,30)
        this.monsterHealth -= SdamageM;
        this.turns.unshift({
            isPlayer:true,
            text:'Player exerts special attack to monster for ' +SdamageM
        });
        
        // attach player
        let SdamageP = this.damageAmt(5,25)
        this.playerHealth -= SdamageP;
        this.turns.unshift({
            isPlayer:false,
            text:'Monster exerts special attack to player for ' +SdamageP
        });
      },
      
    //   calculate damage amount
      damageAmt:function(minDamage, maxDamage){
          return minDamage + Math.round(Math.random() * (maxDamage - minDamage));
      },
    //   calculate heal amount
      healAmt:function(minHeal, maxHeal){
          return minHeal + Math.round(Math.random() * (maxHeal - minHeal));
      },
      
      heal:function(){
        
        //   heal player
        if (this.playerHealth < 90 ) {
            let PlayerHealQty = this.healAmt(20,30)
            this.playerHealth += PlayerHealQty;
            this.turns.unshift({
                isPlayer:true,
                text:'Player heals herself for ' +PlayerHealQty
            });
        }
        
        //   heal monster
        if (this.monsterHealth < 90 ) {
            let MonsterHealQty = this.healAmt(10,20)
            this.monsterHealth += MonsterHealQty;
            this.turns.unshift({
                isPlayer:false,
                text:'Monster heals itself for ' +MonsterHealQty
            });
        }
      },
      
      giveUp:function(){
          this.gameIsRun = !this.gameIsRun;
          return;
      }
  },
  computed:{
      
  },
  watch:{
    //   game ends if monster's blood is exhausted
      monsterHealth:function(){
          if (this.monsterHealth<= 0) {
              alert("monster killed!");
              this.gameIsRun = !this.gameIsRun;
            //   this.monsterHealth = 0;
              return;
          }
          
      },
    // game ends if player's blood is exhausted  
      playerHealth:function(){
          if (this.playerHealth<= 0) {
              alert("Player killed!");
              this.gameIsRun = !this.gameIsRun;
            //   this.monsterHealth = 0;
              return;
          }
         
      }
  }
});
