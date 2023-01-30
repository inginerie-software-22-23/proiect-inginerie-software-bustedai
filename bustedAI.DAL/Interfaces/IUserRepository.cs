using bustedAI.DAL.Entities;
using bustedAI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bustedAI.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetAllUsers();
        Task<Boolean> removeUser(String username);
        Task<Boolean> emailExist(String email);
        Task<Boolean> usernameExist(String username);
        Task<UserModel> toUserModel(User userEntity);
    }
}
