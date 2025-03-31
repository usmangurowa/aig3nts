import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  SupabaseClient,
} from "@supabase/supabase-js";

export const getSession = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }

  return data.session;
};

export const login_with_github = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_WEB_URL}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const login_with_email = async (
  supabase: SupabaseClient,
  { email }: { email: string },
) => {
  const { error, data } = await supabase.auth.signInWithOtp({
    email: email,
    options: { shouldCreateUser: true },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const login_with_email_and_password = async (
  supabase: SupabaseClient,
  payload: SignInWithPasswordCredentials,
) => {
  const { error, data } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    throw error;
  }

  return data;
};

export const register_with_email_and_password = async (
  supabase: SupabaseClient,
  payload: SignUpWithPasswordCredentials,
) => {
  const { error, data } = await supabase.auth.signUp(payload);

  if (error) {
    throw error;
  }

  return data;
};

export const verify_otp = async (
  supabase: SupabaseClient,
  { email, otp }: { email: string; otp: string },
) => {
  const { error, data } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (error) {
    throw error;
  }

  return data;
};
export const update_profile = async (
  supabase: SupabaseClient,
  payload: Record<string, any>,
) => {
  const { data, error } = await supabase.auth.updateUser({
    data: payload,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const logout = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return { success: true };
};

export const forgot_password = async (
  supabase: SupabaseClient,
  { email }: { email: string },
) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_WEB_URL}/auth/reset-password`,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const reset_password = async (
  supabase: SupabaseClient,
  { password }: { password: string },
) => {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    throw error;
  }

  return data;
};
