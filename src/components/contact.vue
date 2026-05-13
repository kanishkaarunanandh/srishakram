<template>
    <div>
         <Navbar1/>
        <div class="header no-select">
            <div style="width: 390px;margin-left: 37%; padding-top: 60px; ">
                <h1 style="text-align: center; font-size:53px;">Contact Us</h1>
            <h4 style="text-align: center; font-weight: bold; font-size: 16px;">When tradition meet styles,you get a silk masterpiece 
            Every weave whisper luxury,every color celebrates you
            </h4>
            <v-btn color="#615443" style="border-radius: 20px; margin-left: 37%; margin-top: 20px;">see more</v-btn>
            </div>
        </div>
        <div class="bgimg">
           
        </div>
        <div style="margin-top: -290px; color: #A07547;" class="no-select">
            <h1 style="text-align: center;">From heritage looms to your wardrobe</h1><br/>
            <h1 style="text-align: center;">-experience pure artistry</h1>
        </div>
        <!-- contact section -->
      <div style="display: flex; justify-content: center; gap: 40px; margin-top: 60px; margin-bottom: 60px;">
        <!-- left section -->
         <div style="width: 600px; ">
         <div>
            <!-- contact us -->
            <div class="no-select">
                <div style="display: flex; justify-content: space-evenly;">
                    <div style="padding: 27px; background-color: #A07547;text-align: center; border-radius: 12px; color: white;" @click="copyToClipboard(phoneNumber)" >
                         <v-btn
                          icon
                          variant="text"><v-icon size="60" >mdi-phone</v-icon> </v-btn>
                        <h5 style="padding-top: 7px;">Phone</h5>
                        <h5 style="padding-top: 7px;">{{ phoneNumber }}</h5>
                    </div>
                    <div style="padding: 27px; background-color: #A07547;text-align: center; border-radius: 12px; color: white;" @click="copyToClipboard(whatsapp)">
                        <v-icon size="60">mdi-whatsapp</v-icon>
                        <h5 style="padding-top: 7px;">Whatsapp</h5>
                        <h5 style="padding-top: 7px;">{{ whatsapp }}</h5>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-evenly; padding-top: 40px;">
                    <div style="padding: 20px; background-color: #A07547;text-align: center; border-radius: 12px; color: white;">
                        <v-btn
                          icon
                          variant="text"
                          @click="openEmail(email)"
                        >
                          <v-icon size="60">mdi-email</v-icon>
                        </v-btn>
                        <h5 style="padding-top: 7px;">Email</h5>
                        <h5 style="padding-top: 7px; font-size: 10px;"> {{email}} </h5>
                    </div>
                    <div style="padding: 27px; background-color: #A07547;text-align: center; border-radius: 12px; color: white;">
                        <v-icon size="60">mdi-whatsapp</v-icon>
                        <h5 style="padding-top: 7px;">Whatsapp</h5>
                        <h5 style="padding-top: 7px;">+91 12345 67890</h5>
                    </div>
                </div>
            </div>
            <!-- location -->
             <div style="width: 70%; height: 250px; background-color: #A07547; margin-left: 90px; margin-top: 40px;">location</div>
         </div>
       </div>
        <!-- right section -->
          <div style="width: 600px;">
         <div>
            <!-- contact us -->
            <div>

                <v-row>
                    <v-col cols="12" >
                        <h1 style="font-weight: 900;">Get In Touch</h1>
                        <h5>Elegance,Delivered</h5>
                        <h5>Threads of royalty,Crafted for modern queens</h5>
                    </v-col>
                </v-row>
              <v-row>
                <v-col cols="12" >
                    <h4 style="padding-bottom: 20px;">Name</h4>
                  <v-text-field  variant="plain" 
                  autocomplete="off"
                  density="compact"
                  style="border-radius: 5px; border: 1px solid #D9D9D9; height: 40px; padding-left: 12px;
                  padding-right: 12px; 
                  "
                  hide-details
                  v-model="name"
                  ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" >
                    <h4 style="padding-bottom: 20px;">Email</h4>
                  <v-text-field  variant="plain" 
                  autocomplete="off"
                  
                  hide-details
                  density="compact"
                  style="border-radius: 5px; border: 1px solid #D9D9D9; height: 40px; padding-left: 12px;
                  padding-right: 12px; cursor: not-allowed;
                  "
                   v-model="useremail"

                  ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" >
                    <h4 style="padding-bottom: 20px;">Mobile No</h4>
                  <v-text-field  variant="plain" 
                  hide-details
                  autocomplete="off"
                  density="compact"
                  style="border-radius: 5px; border: 1px solid #D9D9D9; height: 40px; padding-left: 12px;
                  padding-right: 12px; 
                  "
                   v-model="phoneno"
                  ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" >
                    <h4 style="padding-bottom: 20px;">Message</h4>
                  <v-text-field  variant="plain" 
                  hide-details
                  autocomplete="off"
                  density="compact"
                  style="border-radius: 5px; border: 1px solid #D9D9D9; height: 100px; padding-left: 12px;
                  padding-right: 12px; 
                  "
                   v-model="msg"
                  ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" >
                    <v-btn color="#A07547" block style="border-radius: 20px; margin-top: 10px;" @click="savedata()">Send Message</v-btn>
                </v-col>
              </v-row>
            </div>
         </div>
       </div>
      </div>
        <Footer/>
    </div>
</template>
<style scoped>
 .main-footer {
            width: 100%;
            background-color: #A07547;
            color: #fff;
            padding: 48px 0 0 0;
            height: 550px;
            margin-top: 30px;
        }
        .footer-content {
            display: flex;
            justify-content: space-between;
            max-width: 1100px;
            margin: 0 auto;
            
          
        }
        .footer-left, .footer-right {
            display: flex;
            flex-direction: column;
           
         
        }
        .footer-left {
            align-items: flex-start;
        }
        .footer-right {
            align-items: flex-end;
        }
        .footer-col {
            flex: 1 1 120px;
            margin-bottom: 32px;
            min-width: 220px;
        }
        .footer-col h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #fff;
        }
        .footer-desc {
            font-size: 1rem;
            font-weight: 400;
            margin-bottom: 0;
            color: #fff;
        }
        .footer-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .footer-list li {
            font-size: 1rem;
            margin-bottom: 8px;
            color: #fff;
        }
        .footer-divider {
            border: none;
            border-top: 1px solid #fff;
            margin: 16px 0 0 0;
            width: 90%;
            opacity: 0.7;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        .footer-copyright {
            text-align: center;
            font-size: 1.1rem;
            font-weight: 500;
            margin: 18px 0 24px 0;
            color: #fff;
        }
 
   .header {
  position: relative;
  z-index: 2; 
  background-color: #A07547;
  color: white;
  height: 370px;
}

.bgimg {
  height: 500px;
  background-image: url('@/assets/background2.png');
  background-size: 400px auto;     
  background-repeat: no-repeat;
  margin-top: -190px; 
  position: relative;
  z-index: 1;
  opacity: 0.5; 
}
.circle-img {
  width: 300px;   
  height: 300px;  
  border-radius: 50%;
  overflow: hidden;      
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #A07547; 
  margin-right: 16%;
  margin-top: 60px;
}
.circle-img2 {
  width: 300px;   
  height: 300px;  
  border-radius: 50%;
  overflow: hidden;      
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #A07547; 
  margin-left: 16%;
  margin-top: 60px;
}
.circle-img2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;  
}

.circle-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;  
}
.product-row {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 160px;
        margin-top: 40px;
    }
    .product-card {
        width: 250px;
        height: 400px;
        border-radius: 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-end;
        position: relative;
    }
    .product-img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
    }
    .modal-video {
  width: 40%;
  max-height: 600px;
  border-radius: 8px;
  object-fit: cover;
  background: black;
}

</style>
<script>
import Footer from '@/Common Files/Footer.vue';
import Navbar1 from '@/Common Files/Navbar1.vue';
import api from '@/adminfolder/axios.js';
export default {
  name: 'HomePg',
  components: {
    Navbar1,
    Footer
  },
  data() {
    return {
      images: [],
      phoneNumber: "+91 9876543210",
      whatsapp: "+91 12345 67890",
      email: "srishakram086@gmail.com",
      name: null,
      useremail: localStorage.getItem("userEmail") || "",
      phoneno: null,
      msg: "",
    }
},

methods: {
  copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log("Copied:", text);
          this.$toast?.success("Phone number copied!");
        })
        .catch(err => {
          console.error("Failed to copy", err);
        });
    },
    openEmail(email) {
     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailUrl, "_blank");
  },
  savedata()
  {
     const params = {
        name: this.name,
        email: this.useremail,
        phoneno: Number(this.phoneno),
        msg: this.msg
      };
     api.post("/contact/save",params)
      this.name = "";
      this.useremail = "";
      this.phoneno = "";
      this.msg = "";
  }
}
  }
</script>