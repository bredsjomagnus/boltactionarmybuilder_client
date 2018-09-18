<template>
  <div>
    <b-container>
      <b-card title="LOGIN" sub-title="Log in or create account">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="emailgroup" label="Email address:" label-for="emailinput" description="We'll never share your email with anyone else.">
            <b-form-input id="emailinput" type="email" v-model="form.email" required placeholder="Enter email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="passwordgroup" label="Password:" label-for="passwordinput">
            <b-form-input id="passwordinput" type="password" v-model="form.password" required placeholder="Enter password">
            </b-form-input>
          </b-form-group>
          <center>
            <b-button id="resetbtn" type="reset" variant="default">Reset</b-button>
            <b-button id="loginbtn" type="submit" variant="default">Log in</b-button>
            <b-btn to='/createaccount' id="createbtn" variant="default">Create Account</b-btn>
          </center>
        </b-form>
      </b-card>
      <center>
        <div id="errorwrapper" v-if="loginError">
          <i id='errormsg'>{{ loginError }}</i>
        </div>
      </center>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showmodal: false,
        form: {
          email: "",
          password: "",
          checked: []
        }
      };
    },
    computed: {
      isConfirmed() {
        return (
          this.user.password == this.user.passwordtwo &&
          this.user.passwordtwo.length > 5
        );
      },
      loginError() {
        return this.$store.getters.loginError;
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.$store.dispatch("logInUser", this.form).then(() => {
          console.log("Inloggad");
          this.$router.push({
            path: "/"
          });
        });
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.email = "";
        this.form.password = "";
        this.form.checked = [];
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
      }
    }
  };
</script>

<style scoped>
  .card {
    margin-top: 100px;
  }
  
  .btn {
    border-radius: 0;
    margin: 0 10px 0 10px;
    padding-right: 50px;
    padding-left: 50px;
  }
  
  #loginbtn {
    background-color: #adb6b5;
    border: 1px solid #9ea1a1;
  }
  
  #loginbtn:hover {
    background-color: #c8d3d2;
    border: 1px solid #9ea1a1;
  }
  
  #resetbtn {
    border: 1px solid #e0e0e0;
  }
  
  #resetbtn:hover {
    background-color: white;
    border: 1px solid #e0e0e0;
  }
  
  #createbtn {
    background-color: #e1d5ab;
    border: 1px solid #a59c7f;
    color: #212529;
  }
  
  #createbtn:hover {
    background-color: #f0e6c3;
    border: 1px solid #a59c7f;
    color: #212529;
  }
  
  #errorwrapper {
    margin-top: 50px;
    display: inline-block;
    background-color: #fff1f3;
    width: 100%;
    padding: 5px;
  }
  
  #errormsg {
    color: red;
  }
</style>
