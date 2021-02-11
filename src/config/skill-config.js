export default class SkillConfig {
    static FLAGS_SELFEVALUATION = (process.env.REACT_APP_SKILL_FLAGS_SELFEVALUATION ?? 'false') === 'true'
}