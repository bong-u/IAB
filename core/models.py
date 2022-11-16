from .database import Base

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):

    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)

    assets = relationship('Asset', back_populates='user')

class Asset(Base):
    
    __tablename__ = 'asset'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(Integer)
    balance = Column(Integer)
    color = Column(Integer)
    user_id = Column(Integer, ForeignKey('user.id'))    

    user = relationship('User', back_populates='assets')
    transactions = relationship('Transaction', back_populates='asset')

class Transaction(Base):

    __tablename__ = 'transaction'

    id = Column(Integer, primary_key=True)
    type = Column(Integer)
    expense_type = Column(Integer)
    date = Column(Date)
    money = Column(Integer)
    content = Column(String)
    asset_id = Column(Integer, ForeignKey('asset.id'))

    asset = relationship('Asset', back_populates='transactions')