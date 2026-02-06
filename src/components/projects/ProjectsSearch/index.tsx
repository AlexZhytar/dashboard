import { CloseIcon, SearchIcon } from "@/components/Icons";
import style from "../projects.module.scss";
import { useProjectsStore } from '@/store';
import { useTranslations } from "next-intl";

type ProjectsSearchProps = {
	value: string;
	onChange: ( value: string ) => void;
};

const ProjectsSearch = ( { value, onChange }: ProjectsSearchProps ) => {
	const isSearchActive = useProjectsStore(s => s.isSearchActive);
	const setSearchActive = useProjectsStore(s => s.setSearchActive);
	
	const handleChange = ( val: string ) => {
		onChange(val);
		setSearchActive(val.trim().length > 0);
	};
	
	const handleClear = () => {
		onChange("");
		setSearchActive(false);
	};
	
	const t = useTranslations();
	
	return (
		<div className={ style.projects_search }>
			<SearchIcon size={ 24 } className={ style.icon_search }/>
			<input
				type="search"
				placeholder={ t("projects.search.searchProject") }
				value={ value }
				onChange={ ( e ) => handleChange(e.target.value) }
			/>
			{ isSearchActive && (
				<CloseIcon size={ 24 } className={ style.icon_close } onClick={ handleClear }/>
			) }
		</div>
	);
};


export default ProjectsSearch;