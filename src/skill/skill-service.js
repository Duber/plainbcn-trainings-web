import { api } from '../api/api'
import { skillQualifications } from './skill-qualifications'

export default class SkillService {
    async getSkills() {
        let [skills, user] = await Promise.all([api.getSkills(), api.getUser()])
        skills = skills.map(s => {
            return {
                ...s,
                qualification: evaluate(user, s)
            }
        })
        return skills
    }

    async getSkill(id) {
        let skill = await api.getSkill(id)
        const user = await api.getUser()
        return {
            ...skill,
            qualification: evaluate(user, skill)
        }
    }
}

export const skillService = new SkillService()

function evaluate(user, skill) {
    return user.skills.fit.includes(skill.id) ? skillQualifications.QUALIFIED
        : user.skills.unfit.includes(skill.id) ? skillQualifications.NOT_QUALIFIED
            : user.skills.notInterested.includes(skill.id) ? skillQualifications.NOT_INTERESTED
                : null
}
