export type LinkCard = {
    url: string;
    icon: string;
    label: string;
}

export type ManagerCard = {
    name: string;
    user_id: number;
}

export type PropsCard = {
    project: string;
    color: string;
    deadline: number,
    manager: ManagerCard[];
    links: LinkCard[];
    confirmed_hours: number,
    months_hours: number,
    tracked_hours: number,
}