"use client";
import { Session } from "@supabase/supabase-js";
import { createClient } from "../client/client";
import useSWR from "swr";

const getSession = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw new Error(error.message);
    }

    const { session } = data;
    return {
      ...session?.user,
      ...session?.user.user_metadata,
    } as Session["user"] & {
      displayName: string;
      first_name: string;
      last_name: string;
    };
  } catch (error) {
    throw error;
  }
};

export const useSession = () => useSWR("session", getSession);
