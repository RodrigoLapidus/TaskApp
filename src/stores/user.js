import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    // check if the user is already logged in
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    // sign up the user
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    // sign in their user with the existing account
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    // sign out of the current session
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    // recover password
    async recoverPassword(email) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) throw error;
    },
    // reset password
    async resetPassword(email) {
      // here goes the function
    },
    },
},
);
