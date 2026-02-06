"use client";

import React, { useCallback, useMemo, useState } from "react";
import style from "./style.module.scss";
import modals from "../modal.module.scss";
import { useUserStore } from "@/store";
import {
  Button,
  InputAssignee,
  InputRadioColor,
  InputText,
  Preloader,
} from "@/components/UI";
import { useTranslations } from "next-intl";
import { useUsers } from "@/features/users";
import { PropsCard } from "@/components/projects/types";
import type { UserItem } from "@/features/types";
import { debug } from "console";
import { de } from "react-day-picker/locale";

interface FormState {
  projectID: string;
  projectName: string;
  projectColor: string;
  projectEverhour: string;
  projectApproved: number;
  projectMonths: number;
  projectTracked: number;
  projectManagers: UserItem[];
}

const PROJECT_COLORS = [
  "red",
  "orange",
  "brown",
  "yellow",
  "green",
  "mint",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

interface ModalProjectProps {
  project?: PropsCard;
  mode: "create" | "edit" | string;
}

const toNumber = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const ModalProject = ({ project, mode }: ModalProjectProps) => {
  const { setModalID } = useUserStore();
  const { users, loadUsers } = useUsers(); // ✅ users має бути UserItem[]
  const t = useTranslations();

  // ✅ завжди масив
  const assignedManagers: UserItem[] = useMemo(
    () => (Array.isArray(users) ? users : []),
    [users],
  );

  const [formData, setFormData] = useState<FormState>(() => {
    if (!project || mode === "create") {
      return {
        projectID: "",
        projectName: "",
        projectColor: "",
        projectEverhour: "",
        projectApproved: 0,
        projectMonths: 0,
        projectTracked: 0,
        projectManagers: [],
      };
    }

    return {
      projectID: String(project.id),
      projectName: project.label,
      projectColor: project.color,
      projectApproved: Number(project.confirmed_hours) || 0,
      projectMonths: Number(project.months_hours) || 0,
      projectTracked: Number(project.tracked_hours) || 0,
      projectEverhour: project.everhour_id ?? "",
      projectManagers: (project.assigned_users ?? []).map((a: any) => ({
        id: String(a.id),
        first_name: a.first_name,
        last_name: a.last_name,
      })),
    };
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, dataset } = e.target;

    // ✅ чекбокси асайні
    if (type === "checkbox" && dataset.userId) {
      const userId = String(dataset.userId);
      const firstName = dataset.firstName || "";
      const lastName = dataset.lastName || "";

      setFormData((prev) => {
        const exists = prev.projectManagers.some(
          (a) => String(a.id) === userId,
        );

        const nextManagers: UserItem[] = checked
          ? exists
            ? prev.projectManagers
            : [
                ...prev.projectManagers,
                { id: userId, first_name: firstName, last_name: lastName },
              ]
          : prev.projectManagers.filter((a) => String(a.id) !== userId);

        return { ...prev, projectManagers: nextManagers };
      });

      return;
    }

    // ✅ numeric поля
    if (
      name === "projectApproved" ||
      name === "projectMonths" ||
      name === "projectTracked"
    ) {
      setFormData(
        (prev) => ({ ...prev, [name]: toNumber(value) }) as FormState,
      );
      return;
    }

    // ✅ інші поля
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        let url;
        if (mode === "edit") {
          url = `/api/projects/update-project?project_id=${formData.projectID}`;
        } else {
          url = "/api/projects/create-project";
        }

        const dataToSend = {
          label: formData.projectName,
          color: formData.projectColor,
          everhour_id: formData.projectEverhour,
          confirmed_hours: formData.projectApproved,
          months_hours: formData.projectMonths,
          tracked_hours: formData.projectTracked,
          assigned_ids: formData.projectManagers.map((m) => Number(m.id)),
        };

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            ...dataToSend,
          }),
        });

        const res = await response.json();

        console.log("Response data:", res);

        if (!res.status) {
          console.error("Error updating project:", res.error);
          return;
        }
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }

      setModalID(null);
    },
    [setModalID],
  );

  return (
    <form noValidate className={style.formAddProject} onSubmit={handleSubmit}>
      <div className={style.formAddProject_inner}>
        <div className={`${modals.field} ${modals.field_50}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.projectName")}
          </div>
          <div className={modals.field_input}>
            <InputText
              name="projectName"
              placeholder={t("modals.newProject.placeholders.projectName")}
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_50}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.accentColor")}
          </div>
          <div className={modals.field_color}>
            {PROJECT_COLORS.map((color) => (
              <InputRadioColor
                key={color}
                checked={formData.projectColor === color}
                name="projectColor"
                color={color}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_100}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.assignee")}
          </div>
          <div className={modals.field_assignee}>
            {loadUsers && <Preloader size="sm" />}

            {assignedManagers.map((manager) => {
              const id = String(manager.id);
              const isChecked = formData.projectManagers.some(
                (m) => String(m.id) === id,
              );

              return (
                <InputAssignee
                  key={id}
                  inputName={`projectAssignee-${id}`}
                  first_name={manager.first_name}
                  last_name={manager.last_name}
                  onChange={handleChange}
                  idUser={id}
                  checked={isChecked}
                />
              );
            })}
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_33}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.approved")}
          </div>
          <div className={modals.field_input}>
            <InputText
              number
              name="projectApproved"
              placeholder={t("modals.newProject.placeholders.approved")}
              value={formData.projectApproved}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_33}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.monthly")}
          </div>
          <div className={modals.field_input}>
            <InputText
              number
              name="projectMonths"
              placeholder={t("modals.newProject.placeholders.monthly")}
              value={formData.projectMonths}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_33}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.tracked")}
          </div>
          <div className={modals.field_input}>
            <InputText
              number
              name="projectTracked"
              value={formData.projectTracked}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_66}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.everhour")}
          </div>
          <div className={modals.field_input}>
            <InputText
              name="projectEverhour"
              placeholder={t("modals.newProject.placeholders.everhour")}
              value={formData.projectEverhour}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${modals.field} ${modals.field_100}`}>
          <div className={modals.field_caption}>
            {t("modals.newProject.labels.links")}
          </div>
          <div className={modals.field_input}>{/* links inputs */}</div>
        </div>
      </div>

      <div className={style.formAddProject_bottom}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setModalID(null)}
        >
          {t("uiText.cancel")}
        </Button>

        <Button type="submit" variant="primary">
          {mode === "create" ? t("uiText.createProject") : t("uiText.save")}
        </Button>
      </div>
    </form>
  );
};

export default ModalProject;
