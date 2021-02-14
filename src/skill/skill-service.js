import { api } from '../api/api'

export default class SkillService {
    async getSkills() {
        let [skills, user] = await Promise.all([api.getSkills(), api.getUser()])
        skills = skills.map(s => {
            return {
                ...s,
                accomplished: isAccomplished(user, s)
            }
        })
        return skills
    }

    async getSkill(id) {
        let skill = await api.getSkill(id)
        const user = await api.getUser()
        return {
            ...skill,
            accomplished: isAccomplished(user, skill)
        }
    }
}

export const skillService = new SkillService()

function isAccomplished(user, skill) {
    return user.skills.fit.includes(skill.id) ? true : user.skills.unfit.includes(skill.id) ? false : null
}

