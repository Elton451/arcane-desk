"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";
import createSession from "../../actions/createSession";
import { SessionSchemaType } from "../../schemas/SessionSchema";
import SessionForm from "./SessionForm";

interface SessionCreateFormProps {
  dict: Dictionary;
  campaignId: number;
}

const SessionCreateForm = ({ dict, campaignId }: SessionCreateFormProps) => {
  const router = useRouter();

  const handleSubmit = async (formData: SessionSchemaType) => {
    const mutation = await createSession(campaignId, formData);

    if (mutation?.success && mutation.data) {
      toast(
        t(dict.session.session_created_successfully, {
          name: mutation.data.title,
        }),
      );
      router.push(`/campaign/${campaignId}/session`);
      router.refresh();
    } else {
      toast(dict.session.error_creating_session);
    }
  };

  return <SessionForm dict={dict} handleSubmit={handleSubmit} />;
};

export default SessionCreateForm;
