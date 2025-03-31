import { SupabaseClient } from "@supabase/supabase-js";
import { getSession } from "../actions/auth.action";
import { Tables } from "../types/db-types";

type OrganizationType = Tables<"organization">;

export const getOrganizations = async (
  supabase: SupabaseClient,
): Promise<OrganizationType[] | null> => {
  const session = await getSession(supabase);
  const email = session?.user.email;

  if (!session) {
    return null;
  }
  const { data, error } = await supabase
    .from("member")
    .select(
      `organization_id(*)
      `,
    )
    .eq("email", email);
  if (error) {
    throw new Error(error.message);
  }
  return data.map(
    (item) => item.organization_id as unknown as OrganizationType,
  );
};
