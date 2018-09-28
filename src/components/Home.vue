<template>
  <div>
    <navbar></navbar>
    <b-container fluid>
      <b-row>
        <b-col offset="1" cols="8">
          <h2>Bolt Action Army Builder</h2>
          <p>Here you can build your Bolt Action Army list or more and save to the next time. Start by choosing the nation to find out which units are offered. Then connect this to a theater selector to get the limitations that come from it.</p>
          <b-card-group deck
                class="mb-5">
          <b-card 
            v-for="nation in nations"
            :key=nation.title
            :header=nation.title
            :img-src=nation.img
            img-alt="Image" 
            img-top tag="article" 
            style="width: 20rem;"
            class="mb-2">
            <div id="startbuttonwrapper">
              <center>
                <b-button id="startbuildningbtn" :to=nation.ref variant="default">
                  <font-awesome-icon icon="file-alt" />
                    Start building
                  </b-button>
              </center>
            </div>
            
            <p id="cardtext" class="card-text text-muted">
              {{nation.cardtext}}
            </p>
            
          </b-card>
        </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
// http://atthefront.com/wp-content/uploads/2018/02/ps_dirtyhelmet-576x245.jpg
export default {
  data() {
    return {
      nations: [
        {
          title: "Germany",
          ref: "armybuilder?nation=germany",
          img: "https://www.feldgrau.com/pk-62130.jpg",
          cardtext:
            "By 1939 the Wehrmacht – the German Army (Heer), Navy (Kriegsmarine) and Air Force (Luftwaffe) – had quietly risen to become (arguably) the most powerful fighting force in Europe. So it had to be, because they would be the primary instruments in realising the Nazi Party’s dream of a greater German Reich (its third!): a new world order and German empire that would cover all of Europe and last 1,000 years."
        },
        {
          title: "USA",
          ref: "armybuilder?nation=usa",
          img:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/SC180577t.jpg/1200px-SC180577t.jpg",
          cardtext:
            "On 7 December 1941, without any prior declaration of war, combined Japanese Air and Naval forces launched an attack on the American base at Pearl Harbor. In just over an hour, 350 Japanese aircraft took off from aircraft carriers and sank four American battleships. More than 3,000 people lost their lives in this surprise attack, including around 200 civilians. On 8 December 1941 President Franklin D. Roosevelt, inagreement with Congress, declared a state of war between the United States and Japan. Germany and Italy declared war on the United States four days later. Between December 1941 and February 1942 alone, more than 180,000 Americans signed up to serve their country. Of these around 40% were between 18 and 21 years old (the average age was 26)"
        },
        {
          title: "Britain",
          ref: "armybuilder?nation=britain",
          img:
            "http://imgc.allpostersimages.com/images/P-473-488-90/65/6534/QCE4100Z/posters/anonymous-wwii-europe-france-british-troops-debark-landing.jpg",
          cardtext:
            "Throughout the war the tendency was towards greater mechanisation, but when it came to the crunch it was the Poor Bloody Infantry who went into the attack on foot as they had always done. By the end of the war, the infantry were carrying twice the firepower and were backed-up by more aircraft, artillery pieces and tanks than eve before. The British practice of conserving manpower whenever possible, at the expense of greater weight of artillery or lengthier preparation, was honed throughout the war as resources dwindled and replacements became ever harder to find. This, in part, was the reason that British attacks were so carefully planned and used such heavy concentrations of supporting artillery and airpower."
        }
      ]
    };
  },
  components: {
    Navbar
  },
  computed: {
    // to gain access to the stores getters
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
  //   mounted() {
  //     if (!this.isLoggedIn) {
  //       this.$router.push({ path: "/login" });
  //     }
  //   }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Germania+One|Playfair+Display");
/* font-family: 'Germania One', cursive;
font-family: 'Playfair Display', serif; */
#startbuttonwrapper {
  display: inline-block;
  /* background-color: #f5f5f5; */
  width: 100%;
  padding: 3px;
  /* border: 1px solid #cfcfcf; */
  margin-bottom: 20px;
}
#startbuildningbtn {
  background-color: #e1d5ab;
  border: 1px solid #a59c7f;
  color: #212529;
  border-radius: 0;
}
#startbuildningbtn:hover {
  background-color: #f0e6c3;
}
#cardtext,
h4.card-title,
.card-header {
  font-family: "Playfair Display", serif;
}
h4.card-title,
.card-header {
  text-align: center;
}
.card-header {
  font-size: 32px;
}
</style>
