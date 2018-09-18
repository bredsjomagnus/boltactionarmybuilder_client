<template>
    <div>
        <b-container>
            <b-card title="CREATE ACCOUNT"
                sub-title="Log in or create account">

                <b-form>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="modalfirstgroup"
                                            label="First Name:"
                                            label-for="modalfirstinput">
                                <b-form-input id="modalfirstinput"
                                            type="text"
                                            v-model="user.first"
                                            required
                                            placeholder="Enter first name">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group id="modallastgroup"
                                            label="Last Name:"
                                            label-for="modallastinput">
                                <b-form-input id="modallastinput"
                                            type="text"
                                            v-model="user.last"
                                            required
                                            placeholder="Enter last name">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col>
                            <b-form-group id="modalemailgroup"
                                            label="Email address:"
                                            label-for="modalemailinput"
                                            description="This is also your login username">
                                <b-form-input id="modalemailinput"
                                            type="email"
                                            v-model="user.email"
                                            required
                                            placeholder="Enter email">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group id="modalpasswordonegroup"
                                            label="Password:"
                                            label-for="modalpasswordoneinput">
                                <b-form-input id="modalpasswordoneinput"
                                            type="password"
                                            v-model="user.password"
                                            required
                                            placeholder="Enter password">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                        <b-form-group id="modalpasswordtwogroup"
                                            label="Confirm Password:"
                                            label-for="modalpasswordtwoinput">
                                <b-form-input id="modalpasswordtwoinput"
                                            type="password"
                                            v-model="user.passwordtwo"
                                            required
                                            placeholder="Confirm password"
                                            :state="isConfirmed"
                                            aria-describedby="inputLiveFeedback">
                                </b-form-input>
                                <b-form-invalid-feedback id="inputLiveFeedback">
                                <!-- This will only be shown if the preceeding input has an invalid state -->
                                At least 5 characters. Not confirmed.
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <center>
                        <b-btn to='/login' id="cancelbtn" type="cancel" variant="default">Cancel</b-btn>
                        <b-btn @click="createAccount" id="createbtn" variant="default">Create Account</b-btn>
                    </center>
                </b-form>

            </b-card>
       </b-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        passwordtwo: "",
        first: "",
        last: "",
        isActive: true
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
  },
  methods: {
    createAccount() {
      let vm = this;
      console.log("user: ", this.user);
      this.$store.dispatch("createUserProfile", this.user).then(() => {
        this.password = this.passwordtwo = '';
        this.$router.push({ path: "/login" });
      });
    },

  }
};
</script>

<style>
/* #inputLiveFeedback {
  color: #daafaf;
} */
.card {
  margin-top: 100px;
}
.btn {
  border-radius: 0;
  margin: 0 10px 0 10px;
  padding-right: 50px;
  padding-left: 50px;
}
#cancelbtn {
  background-color: #eeeeee;
  border: 1px solid #e0e0e0;
  color: #212529;
}
#cancelbtn:hover {
  background-color: white;
  border: 1px solid #e0e0e0;
  color: #212529;
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
</style>
